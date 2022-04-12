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
</div>

<style>
	.tile {
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 2em;
		height: 2em;
		max-width: 100px;
		max-height: 100px;
		box-sizing: border-box;
		text-transform: uppercase;
		font-family: 'Open Sans';
		font-weight: 900;
		font-size: 150%;
		color: white;
		background-color: var(--tile-color);
		filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
		transition: all 0.25s ease-in-out;
		user-select: none;
		-webkit-transform: translate3d(0, 0, 0);
		-webkit-tap-highlight-color: transparent;
	}
	.tileSide {
		content: '';
		position: absolute;
		top: 2.25px;
		left: -4.75px;
		height: 100%;
		width: 5px;
		background: var(--tile-color);
		filter: brightness(85%);
		transform: 0.5s;
		transform: rotate(0deg) skewY(-45deg);
	}
	.tileBottom {
		content: '';
		position: absolute;
		bottom: -5px;
		left: -2.5px;
		height: 5px;
		width: 100%;
		background: var(--tile-color);
		transform: 0.5s;
		filter: brightness(75%);
		transform: rotate(0deg) skewX(-45deg);
	}

	.flex {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 10px;
		margin-bottom: 15px;
	}
	button {
		font-family: 'Open Sans';
		font-style: normal;
		font-weight: 600;
		font-size: 24px;
		line-height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 20px;
		border: none;
		text-align: center;
		letter-spacing: 0.245em;
		text-transform: uppercase;
		margin-top: 40px;
		cursor: pointer;
		color: #ffffff;

		height: 40px;
		left: 120px;
		top: 549px;
		margin: 20px;

		background: linear-gradient(
			90deg,
			#e57878 0%,
			#e59978 21.35%,
			#e5da78 40.63%,
			#6fcf96 61.46%,
			#78b7e5 80.73%,
			#bf7dd6 100%
		);
		box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
		border-radius: 5px;
	}
	.header {
		font-family: 'Open Sans';
		font-weight: 600;
		font-size: 1.75rem;
		margin-top: 1.5rem;
		margin-left: 1rem;
		margin-right: 1rem;
	}
	.message {
		font-family: 'Open Sans';
		font-weight: 400;
		margin: 1em;
	}
</style>
