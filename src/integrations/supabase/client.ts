import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://duqgdyzstzpcydztyflb.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR1cWdkeXpzdHpwY3lkenR5ZmxiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQ4MjYzNzAsImV4cCI6MjAyMDQwMjM3MH0.2pv8bHqUxRXCeHBQwvvRzwz0HjqgC1NcxHqJCkqfXjE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce',
    storage: window?.localStorage,
    storageKey: 'producthire-auth-token'
  }
});