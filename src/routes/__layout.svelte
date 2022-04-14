<script>
	import { v4 as newGuid } from 'uuid';
	import { page } from '$app/stores';
	import { supabase } from '../utils/supabase';
	import { onMount } from 'svelte';
	import { browser } from '$app/env';
	import parser from 'ua-parser-js';
	import { query } from 'svelte-pathfinder';

	onMount(async () => {
		if (browser) {
			var ref;
			if (localStorage.getItem('ref')) ref = localStorage.getItem('ref');
			if (ref) $query.params.ref = ref;

			var deviceId = localStorage.getItem('deviceId');
			if (!deviceId) {
				const ua = parser(navigator.userAgent);
				deviceId = newGuid();
				ref = $page.url.searchParams.get('ref') ?? null;
				if (ref) localStorage.setItem('ref', ref);
				localStorage.setItem('deviceId', deviceId);
				const { data, error } = await supabase.from('Devices').insert([
					{
						id: deviceId,
						referralSourceId: ref,
						browser: `${ua.browser.name ?? ''} ${ua.browser.major ?? ''}`,
						device: `${ua.device.vendor ?? ''} ${ua.device.model ?? ''} ${ua.device.type ?? ''}`,
						os: `${ua.os.name ?? ''} ${ua.os.version ?? ''}`
					}
				]);
			}
		}
	});
</script>

<slot />
