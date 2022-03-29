import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://izquajbrfmtjxoxgytor.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY.toString();
const supabase = createClient(supabaseUrl, supabaseKey);

// @ts-ignore
const loggedIn = () => (supabase.auth.currentUser?.aud === 'authenticated' ? true : false);
// @ts-ignore
const userId = () => (supabase.auth.currentUser?.id);

export { supabase, loggedIn, userId };