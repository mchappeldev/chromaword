import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://izquajbrfmtjxoxgytor.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY.toString();
const supabase = createClient(supabaseUrl, supabaseKey);
import { goto } from '$app/navigation';
import { page } from '$app/stores';

// @ts-ignore
const loggedIn = () => (supabase.auth.currentUser?.aud === 'authenticated' ? true : false);
// @ts-ignore
const userId = () => supabase.auth.currentUser?.id;

supabase.auth.onAuthStateChange((event, session) => {
	if (event === 'PASSWORD_RECOVERY') {
		// redirect user to the page where it creates a new password
		// goto(`/updatePassword?${$page.url.searchParams}`)
		console.log(page);
	} else {
		// save the user session
	}
});

export { supabase, loggedIn, userId };
