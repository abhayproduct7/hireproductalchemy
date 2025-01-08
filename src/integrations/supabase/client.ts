import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://duqgdyzstzpcydztyflb.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR1cWdkeXpzdHpwY3lkenR5ZmxiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU5MzEyMDYsImV4cCI6MjA1MTUwNzIwNn0.bpTq4bb3Hb6V9or72K-LxaA9tneVM7C53YAyaaOoJqo';

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