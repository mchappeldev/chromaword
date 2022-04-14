<script>
	import { v4 as newGuid } from 'uuid';
	import { page } from '$app/stores';
	import { supabase } from '../utils/supabase';
	import { onMount } from 'svelte';
	import { browser } from '$app/env';
	import parser from 'ua-parser-js';

	console.log('hey yall');

	onMount(async () => {
		if (browser) {
			const ua = parser(navigator.userAgent);
			var deviceId = localStorage.getItem('deviceId');
			if (!deviceId) {
				deviceId = newGuid();
				localStorage.setItem('deviceId', deviceId);
				const { data, error } = await supabase.from('Devices').insert([
					{
						id: deviceId,
						referralSourceId: $page.url.searchParams.get('ref') ?? null,
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
