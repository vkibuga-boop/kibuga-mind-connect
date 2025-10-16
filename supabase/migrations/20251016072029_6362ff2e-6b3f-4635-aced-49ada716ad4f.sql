-- Make services publicly accessible without authentication

-- Update therapy_bookings to allow anonymous bookings
ALTER TABLE public.therapy_bookings ALTER COLUMN user_id DROP NOT NULL;

DROP POLICY IF EXISTS "Users can create therapy bookings" ON public.therapy_bookings;
DROP POLICY IF EXISTS "Users can update their therapy bookings" ON public.therapy_bookings;
DROP POLICY IF EXISTS "Users can view their therapy bookings" ON public.therapy_bookings;

CREATE POLICY "Anyone can create therapy bookings"
ON public.therapy_bookings
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Anyone can view therapy bookings"
ON public.therapy_bookings
FOR SELECT
USING (true);

CREATE POLICY "Anyone can update therapy bookings"
ON public.therapy_bookings
FOR UPDATE
USING (true);

-- Update bush_buddies_bookings to allow anonymous bookings
ALTER TABLE public.bush_buddies_bookings ALTER COLUMN user_id DROP NOT NULL;

DROP POLICY IF EXISTS "Authenticated users can create their own bookings" ON public.bush_buddies_bookings;
DROP POLICY IF EXISTS "Users can update their own bookings" ON public.bush_buddies_bookings;
DROP POLICY IF EXISTS "Users can view their own bookings" ON public.bush_buddies_bookings;

CREATE POLICY "Anyone can create bush buddies bookings"
ON public.bush_buddies_bookings
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Anyone can view bush buddies bookings"
ON public.bush_buddies_bookings
FOR SELECT
USING (true);

CREATE POLICY "Anyone can update bush buddies bookings"
ON public.bush_buddies_bookings
FOR UPDATE
USING (true);

-- Update therapy services pricing for in-person sessions
UPDATE public.therapy_services
SET physical_price_kes = 200, physical_price_usd = 25
WHERE is_active = true;