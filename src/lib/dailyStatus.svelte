<script>
	import FaStar from 'svelte-icons/fa/FaStar.svelte';
	import FaCaretLeft from 'svelte-icons/fa/FaCaretLeft.svelte';
	import FaCaretRight from 'svelte-icons/fa/FaCaretRight.svelte';

	let levelsComplete = 3;
	let levels = Array(5).fill('');
</script>

<div class="outerContainer">
	<div class="prevNext">
		<div class="icon"><FaCaretLeft /></div>
	</div>
	<div class="innerContainer">
		<div>March 27, 2022 - Level 4</div>
		<div class="starsContainer">
			{#each levels as level, i}
				<div class="icon" class:complete={levelsComplete >= i}><FaStar /></div>
			{/each}
		</div>
	</div>
	<div class="prevNext">
		<div class="icon"><FaCaretRight /></div>
	</div>
</div>

<style>
	.prevNext {
		margin-left: 1rem;
		margin-right: 1rem;
	}
	.outerContainer {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}
	.innerContainer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.starsContainer {
		display: flex;
		flex-direction: row;
	}
	.icon {
		width: 1.5rem;
		height: 1.5rem;
		color: #666;
	}
	.complete {
		color: gold;
	}
</style>
