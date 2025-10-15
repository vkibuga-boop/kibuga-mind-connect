-- Fix search_path for security function by recreating trigger and function
DROP TRIGGER IF EXISTS validate_bush_buddies_booking_prices ON public.bush_buddies_bookings;
DROP FUNCTION IF EXISTS validate_booking_prices();

CREATE OR REPLACE FUNCTION validate_booking_prices()
RETURNS TRIGGER 
LANGUAGE plpgsql 
SECURITY DEFINER
SET search_path = public
AS $$
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
$$;

CREATE TRIGGER validate_bush_buddies_booking_prices
BEFORE INSERT OR UPDATE ON public.bush_buddies_bookings
FOR EACH ROW
EXECUTE FUNCTION validate_booking_prices();