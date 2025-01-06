import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://duqgdyzstzpcydztyflb.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR1cWdkeXpzdHpwY3lkenR5ZmxiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQ0MTI4MDAsImV4cCI6MjAxOTk4ODgwMH0.GG5UMtI_H6-9jsEHkGhBWu8LEGYtHxHVhZJrqK8GrEE';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase URL or Anon Key');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    flowType: 'pkce',
    storage: window.localStorage,
    storageKey: 'supabase.auth.token',
  },
});

// Test the connection
supabase.auth.onAuthStateChange((event, session) => {
  console.log('Supabase connection test - Auth event:', event);
  if (session) {
    console.log('Session exists:', !!session);
  }
});