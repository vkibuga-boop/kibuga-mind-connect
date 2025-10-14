-- Update therapy service prices according to new pricing structure
-- Virtual: 1500 KES / $20 for all
-- In-person: 2000 KES / $25 for all (except group)
-- Couples (Marriage counseling): 4000 KES / $50 for both
-- Group therapy: NULL (upon consultation)

-- Update individual and adolescent therapy
UPDATE therapy_services
SET 
  online_price_kes = 1500,
  online_price_usd = 20,
  physical_price_kes = 2000,
  physical_price_usd = 25
WHERE type IN ('individual_adult', 'adolescent');

-- Update couples therapy (marriage counseling)
UPDATE therapy_services
SET 
  online_price_kes = 4000,
  online_price_usd = 50,
  physical_price_kes = 4000,
  physical_price_usd = 50
WHERE type = 'couples';

-- Update group therapy to NULL (upon consultation)
UPDATE therapy_services
SET 
  online_price_kes = NULL,
  online_price_usd = NULL,
  physical_price_kes = NULL,
  physical_price_usd = NULL
WHERE type = 'group';

-- Update RLS policies for bush_buddies_bookings to allow public inserts
DROP POLICY IF EXISTS "Users can create bush buddies bookings" ON bush_buddies_bookings;

CREATE POLICY "Anyone can create bush buddies bookings"
ON bush_buddies_bookings
FOR INSERT
WITH CHECK (true);

-- Update RLS policy to allow anyone to view bookings
DROP POLICY IF EXISTS "Users can view their bush buddies bookings" ON bush_buddies_bookings;

CREATE POLICY "Anyone can view bush buddies bookings"
ON bush_buddies_bookings
FOR SELECT
USING (true);

-- Drop the update policy for bush buddies since we don't need user-specific updates
DROP POLICY IF EXISTS "Users can update their bush buddies bookings" ON bush_buddies_bookings;