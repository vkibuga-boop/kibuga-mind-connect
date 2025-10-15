-- Make user_id nullable in user_assessment_results for public access
ALTER TABLE public.user_assessment_results 
ALTER COLUMN user_id DROP NOT NULL;

-- Add email and mobile_number fields for payment verification
ALTER TABLE public.user_assessment_results 
ADD COLUMN email text,
ADD COLUMN mobile_number text,
ADD COLUMN payment_claimed_at timestamp with time zone,
ADD COLUMN admin_verified boolean DEFAULT false;

-- Update RLS policies for public access to assessments
DROP POLICY IF EXISTS "Users can create assessment results" ON public.user_assessment_results;
DROP POLICY IF EXISTS "Users can view their own assessment results" ON public.user_assessment_results;
DROP POLICY IF EXISTS "Users can update their own assessment results" ON public.user_assessment_results;

CREATE POLICY "Anyone can create assessment results"
ON public.user_assessment_results
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Anyone can view assessment results with their email"
ON public.user_assessment_results
FOR SELECT
USING (true);

CREATE POLICY "Anyone can update assessment results"
ON public.user_assessment_results
FOR UPDATE
USING (true);