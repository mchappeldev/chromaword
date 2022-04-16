<script>
	export let visible = true;
	import { colors, seenInstructions } from '../store';
	import { onDestroy } from 'svelte';
	const chroma = 'chroma'.split('');
	const cat = 'cat'.split('');
	const tap = 'tap'.split('');
	onDestroy(() => ($seenInstructions = true));
</script>

<div class="header">Instructions</div>
<div class="message">
	The goal of the game is to fill in the blank colored tiles in order to complete all of the words
	on the board. For example if you had the following:
</div>

<div class="flex">
	{#each cat as letter, i}
		<div class="tile" style="--tile-color: {letter === 't' ? $colors[0] : $colors[6]}">
			<div class="tileSide" />
			{#if letter != 't'}
				{cat[i]}
			{/if}
			<div class="tileBottom" />
		</div>
	{/each}
</div>
<div class="flex">
	{#each tap as letter, i}
		<div class="tile" style="--tile-color: {letter === 't' ? $colors[0] : $colors[6]}">
			<div class="tileSide" />
			{#if letter != 't'}
				{tap[i]}
			{/if}
			<div class="tileBottom" />
		</div>
	{/each}
</div>
<div class="message">
	Hmmm what could that be? Well one possible answer would be to use 'T' to make the words Cat and
	Tap like so:
</div>

<div class="flex">
	{#each cat as letter, i}
		<div class="tile" style="--tile-color: {letter === 't' ? $colors[0] : $colors[6]}">
			<div class="tileSide" />
			{cat[i]}
			<div class="tileBottom" />
		</div>
	{/each}
</div>
<div class="flex">
	{#each tap as letter, i}
		<div class="tile" style="--tile-color: {letter === 't' ? $colors[0] : $colors[6]}">
			<div class="tileSide" />
			{tap[i]}
			<div class="tileBottom" />
		</div>
	{/each}
</div>

<div class="message">
	But it could also be 'R' making the words 'Car' and 'Rap'. The only way to know for sure is to use
	the other words on the board. Each board will only have one answer once every letter is filled in.
	Here's a few other things to keep in mind:
	<ul>
		<li>
			Each color will be a different letter and none of them will be the same as any grey letter.
		</li>
		<li>There will only be one good solution</li>
		<li>You only have to spell words from left to right, not up and down.</li>
	</ul>
	<p style="text-align: center;">
		<br />Questions? <a href="mailto:mikeandmikedevs@gmail.com"> Contact us.</a>
	</p>
</div>

<style>
	a {
		font-weight: 900;
	}

	.tile {
		-webkit-tap-highlight-color: transparent;
		-webkit-transform: translate3d(0, 0, 0);
		align-items: center;
		background-color: var(--tile-color);
		box-sizing: border-box;
		color: white;
		display: flex;
		filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
		font-family: 'Open Sans';
		font-size: 150%;
		font-weight: 900;
		height: 2em;
		justify-content: center;
		max-height: 100px;
		max-width: 100px;
		position: relative;
		text-transform: uppercase;
		transition: all 0.25s ease-in-out;
		user-select: none;
		width: 2em;
	}
	.tileSide {
		background: var(--tile-color);
		content: '';
		filter: brightness(85%);
		height: 100%;
		left: -4.75px;
		position: absolute;
		top: 2.25px;
		transform: 0.5s;
		transform: rotate(0deg) skewY(-45deg);
		width: 5px;
	}
	.tileBottom {
		background: var(--tile-color);
		bottom: -5px;
		content: '';
		filter: brightness(75%);
		height: 5px;
		left: -2.5px;
		position: absolute;
		transform: 0.5s;
		transform: rotate(0deg) skewX(-45deg);
		width: 100%;
	}

	.flex {
		align-items: center;
		display: flex;
		gap: 10px;
		justify-content: center;
		margin-bottom: 15px;
	}

	.header {
		font-family: 'Open Sans';
		font-size: 1.75rem;

		margin-left: 1rem;
		margin-right: 1rem;
		margin-top: 1.5rem;
		text-transform: uppercase;
		font-weight: 800;
		font-size: 1.75rem;
	}
	.message {
		font-family: 'Open Sans';
		font-weight: 400;
		margin: 1em;
	}
</style>
