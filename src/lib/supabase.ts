import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables. Please check your .env file.');
  throw new Error('Missing Supabase environment variables. Please check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
    storageKey: 'supabase.auth.token',
    storage: localStorage
  },
  db: {
    schema: 'public'
  }
});

// Test the connection and properly handle the Promise
(async () => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      console.log('Successfully connected to Supabase with valid session');
    } else {
      console.log('Connected to Supabase but no active session');
    }
  } catch (error) {
    console.error('Error connecting to Supabase:', error);
  }
})();