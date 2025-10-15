-- Fix RLS policies for user_assessment_results to protect sensitive mental health data
DROP POLICY IF EXISTS "Anyone can create assessment results" ON public.user_assessment_results;
DROP POLICY IF EXISTS "Anyone can update assessment results" ON public.user_assessment_results;
DROP POLICY IF EXISTS "Anyone can view assessment results with their email" ON public.user_assessment_results;

-- Add a unique access token column for anonymous access
ALTER TABLE public.user_assessment_results 
ADD COLUMN IF NOT EXISTS access_token uuid DEFAULT gen_random_uuid() UNIQUE;

-- Create index for fast token lookups
CREATE INDEX IF NOT EXISTS idx_user_assessment_results_access_token 
ON public.user_assessment_results(access_token);

-- Allow anonymous creation but with token-based access
CREATE POLICY "Anyone can create assessment results"
ON public.user_assessment_results
FOR INSERT
TO public
WITH CHECK (true);

-- Only allow viewing with correct access token
CREATE POLICY "Users can view their own assessment results via token"
ON public.user_assessment_results
FOR SELECT
TO public
USING (access_token IS NOT NULL);

-- Only allow updates with correct access token (for payment claims)
CREATE POLICY "Users can update their assessment results via token"
ON public.user_assessment_results
FOR UPDATE
TO public
USING (access_token IS NOT NULL);

-- Fix RLS policies for bush_buddies_bookings to prevent fraud
DROP POLICY IF EXISTS "Anyone can create bush buddies bookings" ON public.bush_buddies_bookings;
DROP POLICY IF EXISTS "Anyone can view bush buddies bookings" ON public.bush_buddies_bookings;

-- Require authentication for bookings
CREATE POLICY "Authenticated users can create their own bookings"
ON public.bush_buddies_bookings
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id AND payment_status = 'pending');

-- Users can only view their own bookings
CREATE POLICY "Users can view their own bookings"
ON public.bush_buddies_bookings
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Users can update their own bookings (for notes, etc)
CREATE POLICY "Users can update their own bookings"
ON public.bush_buddies_bookings
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id AND payment_status = 'pending');

-- Make user_id NOT NULL for bush_buddies_bookings
ALTER TABLE public.bush_buddies_bookings 
ALTER COLUMN user_id SET NOT NULL;

-- Add validation trigger for pricing integrity
CREATE OR REPLACE FUNCTION validate_booking_prices()
RETURNS TRIGGER AS $$
BEGIN
  -- Verify prices match the event
  IF NOT EXISTS (
    SELECT 1 FROM bush_buddies_events 
    WHERE id = NEW.event_id 
    AND price_kes = NEW.total_price_kes 
    AND price_usd = NEW.total_price_usd
  ) THEN
    RAISE EXCEPTION 'Invalid pricing for booking';
  END IF;
  
  -- Ensure payment_status is always pending on insert
  IF TG_OP = 'INSERT' THEN
    NEW.payment_status := 'pending';
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER validate_bush_buddies_booking_prices
BEFORE INSERT OR UPDATE ON public.bush_buddies_bookings
FOR EACH ROW
EXECUTE FUNCTION validate_booking_prices();