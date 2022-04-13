<script>
	import { goto } from '$app/navigation';

	import Instructions from '$lib/instructions.svelte';
	import Modal from '$lib/modal.svelte';

	let showModal = true;
	$: {
		if (!showModal) {
			goto('/');
		}
	}
</script>

<Modal bind:visible={showModal}>
	<Instructions />
</Modal>
