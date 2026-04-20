import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase URL or Anon Key is missing. Check your .env file.');
}

// Fallback to a dummy URL if missing to prevent React crashing
export const supabase = createClient(supabaseUrl || 'https://placeholder.supabase.co', supabaseAnonKey || 'placeholder');

export async function saveLead(email: string, website_url: string, analysis_result: any) {
  const { data, error } = await supabase
    .from('leads')
    .insert([
      { email, website_url, analysis_result },
    ]);

  if (error) {
    console.error('Error saving lead:', error);
    throw error;
  }

  return data;
}
