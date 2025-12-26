/**
 * Supabase Client Configuration
 * Клиент для подключения к Supabase БД
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL || 'https://api.gipnozio.ru';
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zeWh1anFobWl6cW53cmRvenJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU3ODA1MjAsImV4cCI6MjA4MTM1NjUyMH0.C-zJJALkS29sLsRcWQBsgKoF0FWLsbW4A72Ch8XAz4Q';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
