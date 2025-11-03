-- Add SELECT policies for therapy_bookings and bush_buddies_bookings
-- Prevent public SELECT to protect customer data from scraping

CREATE POLICY "Prevent public SELECT on therapy bookings"
ON therapy_bookings
FOR SELECT
TO public
USING (false);

CREATE POLICY "Prevent public SELECT on bush buddies bookings"
ON bush_buddies_bookings
FOR SELECT
TO public
USING (false);

-- For user_assessment_results, tighten the existing policy
-- Drop the overly permissive SELECT policy
DROP POLICY IF EXISTS "Allow viewing assessment via access token" ON user_assessment_results;

-- Note: Without authentication, we cannot perfectly secure access_token-based access
-- The application layer must handle token-based filtering via .eq('access_token', token)
-- This policy prevents blanket SELECT * queries
CREATE POLICY "Block unauthenticated assessment viewing"
ON user_assessment_results
FOR SELECT
TO public
USING (false);