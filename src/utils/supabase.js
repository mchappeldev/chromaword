import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://izquajbrfmtjxoxgytor.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY.toString();
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;