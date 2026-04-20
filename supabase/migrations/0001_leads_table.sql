-- Migration: Create leads table for AI Automation Architect

CREATE TABLE IF NOT EXISTS public.leads (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT NOT NULL,
    website_url TEXT NOT NULL,
    analysis_result JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Allow anyone (or specific authenticated users) to insert a lead
-- Because the service role bypasses RLS, this policy allows client-side inserts. 
CREATE POLICY "Allow public inserts" ON public.leads
    FOR INSERT
    TO public
    WITH CHECK (true);

-- Restrict read access so users cannot read others' data
-- Only admins with the service role will be able to read these records.
CREATE POLICY "Deny public reads" ON public.leads
    FOR SELECT
    TO public
    USING (false);
