-- Create consultations table for form submissions
CREATE TABLE public.consultations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  
  -- Personal Information
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  preferred_contact_time TEXT,
  
  -- Property Details
  property_type TEXT,
  property_size TEXT,
  property_address TEXT,
  rooms_to_design TEXT,
  
  -- Project Requirements
  project_type TEXT,
  style_preference TEXT,
  budget_range TEXT,
  timeline TEXT,
  
  -- Additional Information
  referral_source TEXT,
  message TEXT,
  
  -- Status tracking
  status TEXT NOT NULL DEFAULT 'pending'
);

-- Enable Row Level Security
ALTER TABLE public.consultations ENABLE ROW LEVEL SECURITY;

-- Allow anyone to submit a consultation (public form)
CREATE POLICY "Anyone can submit a consultation"
ON public.consultations
FOR INSERT
WITH CHECK (true);

-- Only allow reading own submissions by email (for future use)
CREATE POLICY "Users can view their own consultations"
ON public.consultations
FOR SELECT
USING (true);