<script>
	import supabase from '../utils/supabase';
	import FaUser from 'svelte-icons/fa/FaUser.svelte';
	import FaBars from 'svelte-icons/fa/FaBars.svelte';

	let loggedIn = supabase.auth.currentUser?.aud === 'authenticated';
</script>

<div class="navBar">
	<div class="icon"><FaBars /></div>
	<div class="icon"><a href={loggedIn ? '/profile' : '/login'}><FaUser /></a></div>
</div>

<style>
	.navBar {
		display: flex;
		justify-content: space-between;
		max-width: 600px;
		width: 100%;
		margin-top: 1rem;
	}
	.icon {
		width: 1.5rem;
		height: 1.5rem;
		color: #444;
	}
</style>
