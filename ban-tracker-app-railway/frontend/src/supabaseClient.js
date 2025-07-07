// src/supabaseClient.js

import { createClient } from '@supabase/supabase-js';

// Environment variables (these must be set in your .env file or Railway project)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create the Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Export it as default
export default supabase;
