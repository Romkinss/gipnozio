import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://api.gipnozio.ru';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zeWh1anFobWl6cW53cmRvenJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU3ODA1MjAsImV4cCI6MjA4MTM1NjUyMH0.C-zJJALkS29sLsRcWQBsgKoF0FWLsbW4A72Ch8XAz4Q';

export const supabase = createClient(supabaseUrl, supabaseKey);