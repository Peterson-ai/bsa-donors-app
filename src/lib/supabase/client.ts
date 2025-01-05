import { createClient } from '@supabase/supabase-js';
import { env } from '../config/env';

if (!env.supabase.url || !env.supabase.anonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(env.supabase.url, env.supabase.anonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// Test the connection and properly handle the Promise
export const initializeSupabase = async () => {
  try {
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;
    
    console.log('Supabase initialized:', data.session ? 'with session' : 'no active session');
    return true;
  } catch (error) {
    console.error('Failed to initialize Supabase:', error);
    throw error;
  }
};