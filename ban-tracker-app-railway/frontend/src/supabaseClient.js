// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rvctpsjbxmagzlaejjoz.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ2Y3Rwc2pieG1hZ3psYWVqam96Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE0NzA5MzcsImV4cCI6MjA2NzA0NjkzN30.G7j9M4CWJfwfAdE4l45xloUa9mNfWx_XZVWy2W7ta0I'; // use full anon key

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
