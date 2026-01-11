-- Drop the overly permissive SELECT policy that exposes customer data
DROP POLICY IF EXISTS "Users can view their own consultations" ON public.consultations;

-- Keep the INSERT policy so anyone can submit a consultation form
-- The existing "Anyone can submit a consultation" policy is appropriate

-- Note: Viewing consultations should only be done by administrators
-- through the Supabase dashboard or a future admin panel with proper authentication