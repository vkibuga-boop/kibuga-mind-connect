-- Fix therapy pricing to 2000 KES
UPDATE therapy_services 
SET physical_price_kes = 2000
WHERE physical_price_kes = 200;

-- Add phone_number column to therapy_bookings
ALTER TABLE therapy_bookings 
ADD COLUMN IF NOT EXISTS phone_number TEXT;

-- Add phone_number column to bush_buddies_bookings
ALTER TABLE bush_buddies_bookings 
ADD COLUMN IF NOT EXISTS phone_number TEXT;