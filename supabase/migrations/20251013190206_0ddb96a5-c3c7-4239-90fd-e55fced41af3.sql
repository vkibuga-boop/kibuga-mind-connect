-- Create enum for therapy service types
CREATE TYPE public.therapy_service_type AS ENUM (
  'individual_adult',
  'adolescent',
  'couples',
  'group'
);

-- Create enum for session format
CREATE TYPE public.session_format AS ENUM (
  'online',
  'physical'
);

-- Create enum for booking status
CREATE TYPE public.booking_status AS ENUM (
  'pending',
  'confirmed',
  'completed',
  'cancelled'
);

-- Create enum for payment status
CREATE TYPE public.payment_status AS ENUM (
  'pending',
  'paid',
  'refunded'
);

-- Create therapy services table with pricing
CREATE TABLE public.therapy_services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  type therapy_service_type NOT NULL,
  description TEXT,
  online_price_kes DECIMAL(10, 2) DEFAULT 1500,
  online_price_usd DECIMAL(10, 2) DEFAULT 20,
  physical_price_kes DECIMAL(10, 2) DEFAULT 2500,
  physical_price_usd DECIMAL(10, 2) DEFAULT 30,
  duration_minutes INTEGER DEFAULT 60,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create bush buddies events table
CREATE TABLE public.bush_buddies_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  poster_url TEXT,
  date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  location TEXT,
  max_participants INTEGER DEFAULT 20,
  current_participants INTEGER DEFAULT 0,
  price_kes DECIMAL(10, 2),
  price_usd DECIMAL(10, 2),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create psychometric assessments table
CREATE TABLE public.psychometric_assessments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  questions JSONB NOT NULL,
  result_fee_kes DECIMAL(10, 2) DEFAULT 150,
  result_fee_usd DECIMAL(10, 2) DEFAULT 2,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create user assessment results table (stores completed tests)
CREATE TABLE public.user_assessment_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  assessment_id UUID REFERENCES public.psychometric_assessments(id) ON DELETE CASCADE,
  answers JSONB NOT NULL,
  completed_at TIMESTAMPTZ DEFAULT now(),
  payment_status payment_status DEFAULT 'pending',
  result_unlocked BOOLEAN DEFAULT false
);

-- Create therapy bookings table
CREATE TABLE public.therapy_bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  service_id UUID REFERENCES public.therapy_services(id) ON DELETE CASCADE,
  session_format session_format NOT NULL,
  booking_date DATE NOT NULL,
  booking_time TIME NOT NULL,
  status booking_status DEFAULT 'pending',
  meeting_link TEXT,
  is_first_session BOOLEAN DEFAULT false,
  sessions_count INTEGER DEFAULT 1,
  discount_applied BOOLEAN DEFAULT false,
  discount_percentage DECIMAL(5, 2) DEFAULT 0,
  total_price_kes DECIMAL(10, 2),
  total_price_usd DECIMAL(10, 2),
  payment_status payment_status DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create bush buddies bookings table
CREATE TABLE public.bush_buddies_bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  event_id UUID REFERENCES public.bush_buddies_events(id) ON DELETE CASCADE,
  status booking_status DEFAULT 'pending',
  payment_status payment_status DEFAULT 'pending',
  total_price_kes DECIMAL(10, 2),
  total_price_usd DECIMAL(10, 2),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create available time slots table
CREATE TABLE public.available_time_slots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  is_available BOOLEAN DEFAULT true,
  session_format session_format NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(date, start_time, session_format)
);

-- Enable RLS
ALTER TABLE public.therapy_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bush_buddies_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.psychometric_assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_assessment_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.therapy_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bush_buddies_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.available_time_slots ENABLE ROW LEVEL SECURITY;

-- RLS Policies for public read access
CREATE POLICY "Anyone can view active therapy services"
  ON public.therapy_services FOR SELECT
  USING (is_active = true);

CREATE POLICY "Anyone can view active events"
  ON public.bush_buddies_events FOR SELECT
  USING (is_active = true);

CREATE POLICY "Anyone can view active assessments"
  ON public.psychometric_assessments FOR SELECT
  USING (is_active = true);

CREATE POLICY "Anyone can view available time slots"
  ON public.available_time_slots FOR SELECT
  USING (is_available = true);

-- RLS Policies for authenticated users
CREATE POLICY "Users can view their own assessment results"
  ON public.user_assessment_results FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create assessment results"
  ON public.user_assessment_results FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own assessment results"
  ON public.user_assessment_results FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view their therapy bookings"
  ON public.therapy_bookings FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create therapy bookings"
  ON public.therapy_bookings FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their therapy bookings"
  ON public.therapy_bookings FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view their bush buddies bookings"
  ON public.bush_buddies_bookings FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create bush buddies bookings"
  ON public.bush_buddies_bookings FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their bush buddies bookings"
  ON public.bush_buddies_bookings FOR UPDATE
  USING (auth.uid() = user_id);

-- Insert default therapy services
INSERT INTO public.therapy_services (name, type, description, online_price_kes, online_price_usd, physical_price_kes, physical_price_usd) VALUES
  ('Individual Adult Therapy', 'individual_adult', 'One-on-one therapy sessions for adults dealing with anxiety, depression, stress, and personal growth', 1500, 20, 2500, 30),
  ('Adolescent Therapy', 'adolescent', 'Specialized therapy for teenagers and young adults navigating developmental challenges, school stress, and identity formation', 1500, 20, 2500, 30),
  ('Couples Therapy', 'couples', 'Relationship counseling for couples seeking to improve communication and resolve conflicts', 1500, 20, 2500, 30),
  ('Group Therapy', 'group', 'Therapeutic group sessions for shared experiences and peer support', 1500, 20, 2500, 30);

-- Insert sample psychometric assessments
INSERT INTO public.psychometric_assessments (name, category, description, questions, result_fee_kes, result_fee_usd) VALUES
  ('Big Five Personality Test', 'Personality', 'Comprehensive assessment of five major personality dimensions', '[]'::jsonb, 150, 2),
  ('Generalized Anxiety Disorder (GAD-7)', 'Mental Health', 'Screening tool for anxiety disorders', '[]'::jsonb, 150, 2),
  ('Depression Screening (PHQ-9)', 'Mental Health', 'Assessment for depressive symptoms', '[]'::jsonb, 150, 2),
  ('PTSD Checklist (PCL-5)', 'Mental Health', 'Screening for post-traumatic stress disorder', '[]'::jsonb, 150, 2),
  ('Temperament Assessment', 'Temperament', 'Understand your natural behavioral and emotional patterns', '[]'::jsonb, 150, 2);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_therapy_services_updated_at
  BEFORE UPDATE ON public.therapy_services
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_bush_buddies_events_updated_at
  BEFORE UPDATE ON public.bush_buddies_events
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_psychometric_assessments_updated_at
  BEFORE UPDATE ON public.psychometric_assessments
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_therapy_bookings_updated_at
  BEFORE UPDATE ON public.therapy_bookings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_bush_buddies_bookings_updated_at
  BEFORE UPDATE ON public.bush_buddies_bookings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();