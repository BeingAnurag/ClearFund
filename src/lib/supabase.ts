import { createClient } from '@supabase/supabase-js';

// 🛑 TODO: Replace with your actual keys from Supabase Dashboard
const supabaseUrl = 'https://ldetbsljikvpeiqpxkmb.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxkZXRic2xqaWt2cGVpcXB4a21iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc0MzI1NzEsImV4cCI6MjA4MzAwODU3MX0.Mugqyhs6YaL9s9rVFVHpAWxXOiK5JyHA7LoOcNLVte0';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);