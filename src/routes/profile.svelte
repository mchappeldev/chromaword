<script>
	import { supabase } from '../utils/supabase';
	import { goto } from '$app/navigation';

	// @ts-ignore
	let loggedIn = supabase.auth.currentUser?.aud === 'authenticated';
	let logOff = async () => {
		await supabase.auth.signOut();
		await goto('/login');
	};
</script>

<div>{loggedIn ? 'Logged in' : 'Not Logged In'}</div>
{#if loggedIn}
	<button on:click={logOff}>Log Off</button>
{/if}

<style>
</style>
