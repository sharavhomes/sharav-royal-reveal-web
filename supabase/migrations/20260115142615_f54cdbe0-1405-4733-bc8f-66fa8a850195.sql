-- Add server-side validation constraints to consultations table
-- These constraints enforce data validation at the database level

-- Add length constraints for text fields
ALTER TABLE public.consultations
  ADD CONSTRAINT check_name_length CHECK (length(full_name) <= 100),
  ADD CONSTRAINT check_email_length CHECK (length(email) <= 255),
  ADD CONSTRAINT check_email_format CHECK (email ~* '^[^\s@]+@[^\s@]+\.[^\s@]+$'),
  ADD CONSTRAINT check_phone_length CHECK (phone IS NULL OR length(phone) <= 30),
  ADD CONSTRAINT check_message_length CHECK (message IS NULL OR length(message) <= 5000),
  ADD CONSTRAINT check_address_length CHECK (property_address IS NULL OR length(property_address) <= 500),
  ADD CONSTRAINT check_property_type_length CHECK (property_type IS NULL OR length(property_type) <= 100),
  ADD CONSTRAINT check_property_size_length CHECK (property_size IS NULL OR length(property_size) <= 100),
  ADD CONSTRAINT check_rooms_length CHECK (rooms_to_design IS NULL OR length(rooms_to_design) <= 500),
  ADD CONSTRAINT check_project_type_length CHECK (project_type IS NULL OR length(project_type) <= 100),
  ADD CONSTRAINT check_style_length CHECK (style_preference IS NULL OR length(style_preference) <= 500),
  ADD CONSTRAINT check_budget_length CHECK (budget_range IS NULL OR length(budget_range) <= 100),
  ADD CONSTRAINT check_timeline_length CHECK (timeline IS NULL OR length(timeline) <= 100),
  ADD CONSTRAINT check_referral_length CHECK (referral_source IS NULL OR length(referral_source) <= 200),
  ADD CONSTRAINT check_contact_time_length CHECK (preferred_contact_time IS NULL OR length(preferred_contact_time) <= 100),
  ADD CONSTRAINT check_status_length CHECK (length(status) <= 50);