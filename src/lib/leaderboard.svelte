<script>
	import { supabase } from '../utils/supabase';
	export let visible = true;
	import { colors } from '../store.js';
	// const players = ['michael', 'jimmy', 'megan', 'melissa', 'frank', 'katie', 'Joe'];
	let players;

	async function getLeaderboard() {
		const { data, error } = await supabase.rpc('get_leaderboard');
		console.log(error);
		players = data;
	}
	let promise = getLeaderboard();
</script>

<div class="header">Leaderboard</div>
{#await promise}
	<div class="loader">Loading...</div>
{:then number}
	<div class="top-6">
		{#each players as player, i}
			{#if i < 6}
				<div class="topTile" style="--tile-color: {$colors[i]}">
					<div class="circle-6">{i + 1}</div>
					<div class="name">{player.displayName}</div>
					<div class="winsWrap-6">
						{player.wins}
						<div class="wins-6">
							{#if player.wins == 1}Win{:else}Wins{/if}
						</div>
					</div>

					<div class="tileSide" />
					<div class="tileBottom" />
				</div>
			{/if}
		{/each}
	</div>
	<div class="top-100">
		{#each players as player, i}
			{#if i > 5 && i < 101}
				<div class="playerTile" style="--tile-color: #eee">
					<div class="circle">{i + 1}</div>
					<div class="name">{player.displayName}</div>
					<div class="winsWrap">
						{player.wins}
						<div class="wins">
							{#if player.wins == 1}Win{:else}Wins{/if}
						</div>
					</div>
					<div class="tileSide" />
					<div class="tileBottom" />
				</div>
			{/if}
		{/each}
	</div>
{/await}

<style>
	.winsWrap {
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		background: rgba(0, 0, 0, 0.25);
		padding: 5px;
		border-radius: 0.25rem;
	}
	.winsWrap-6 {
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		padding: 5px;
		border-radius: 0.25rem;
	}
	.wins {
		font-size: 0.5rem;
		font-weight: 400;
	}
	.wins-6 {
		font-size: 0.8rem;
		font-weight: 400;
	}
	.name {
		font-size: 0.7rem;
		height: 2rem;
	}
	.circle {
		border-radius: 10rem;
		background: rgba(0, 0, 0, 0.25);
		padding: 1rem;
		color: #444;
		height: 4px;
		width: 4px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.circle-6 {
		border-radius: 10rem;
		background: rgba(0, 0, 0, 0.25);
		padding: 1rem;
		color: #fff;
		height: 4px;
		width: 4px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.top-6 {
		display: grid;
		grid-template-columns: 1fr;
		grid-auto-rows: 1fr 1fr 1fr 1fr 1fr 1fr;
		gap: 15px;
		margin: 25px;
	}

	.top-100 {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		flex-direction: column;
		gap: 15px;
	}

	.topTile {
		-webkit-tap-highlight-color: transparent;
		-webkit-transform: translate3d(0, 0, 0);
		align-items: center;
		background-color: var(--tile-color);
		box-sizing: border-box;
		color: white;
		display: flex;
		flex-direction: column;
		filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
		font-weight: 900;
		padding: 15px;
		justify-content: space-between;
		position: relative;
		text-transform: uppercase;
		transition: all 0.25s ease-in-out;
		user-select: none;
		gap: 10px;
		width: 90vw;
	}

	.playerTile {
		-webkit-tap-highlight-color: transparent;
		-webkit-transform: translate3d(0, 0, 0);
		align-items: center;
		background-color: var(--tile-color);
		box-sizing: border-box;
		color: #444;
		display: flex;
		filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
		font-family: 'Open Sans';
		font-size: 100%;
		font-weight: 900;

		justify-content: space-between;
		max-height: 100px;
		position: relative;
		text-transform: uppercase;
		transition: all 0.25s ease-in-out;
		user-select: none;
		width: 100%;
		padding: 10px 25px;
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

	.header {
		font-family: 'Open Sans';
		font-size: 1.75rem;
		font-weight: 800;
		margin-left: 1rem;
		margin-right: 1rem;
		margin-top: 1.5rem;
		text-transform: uppercase;
	}

	/* SPINNER */
	.loader,
	.loader:before,
	.loader:after {
		background: #ffffff;
		-webkit-animation: load1 1s infinite ease-in-out;
		animation: load1 1s infinite ease-in-out;
		width: 1em;
		height: 4em;
	}
	.loader {
		color: #000;
		text-indent: -9999em;
		margin: 88px auto;
		position: relative;
		font-size: 11px;
		-webkit-transform: translateZ(0);
		-ms-transform: translateZ(0);
		transform: translateZ(0);
		-webkit-animation-delay: -0.16s;
		animation-delay: -0.16s;
	}
	.loader:before,
	.loader:after {
		position: absolute;
		top: 0;
		content: '';
	}
	.loader:before {
		left: -1.5em;
		-webkit-animation-delay: -0.32s;
		animation-delay: -0.32s;
	}
	.loader:after {
		left: 1.5em;
	}
	@-webkit-keyframes load1 {
		0%,
		80%,
		100% {
			box-shadow: 0 0;
			height: 4em;
		}
		40% {
			box-shadow: 0 -2em;
			height: 5em;
		}
	}
	@keyframes load1 {
		0%,
		80%,
		100% {
			box-shadow: 0 0;
			height: 4em;
		}
		40% {
			box-shadow: 0 -2em;
			height: 5em;
		}
	}

	/* SPINNER */

	@media only screen and (min-width: 390px) {
		.top-6 {
			grid-template-columns: 1fr 1fr;
			grid-auto-rows: 1fr 1fr 1fr;
			gap: 20px;
		}
		.topTile {
			height: 150px;
			width: 150px;
		}
		.name {
			font-size: 0.9rem;
		}
	}
	@media only screen and (min-width: 680px) {
		.top-6 {
			grid-template-columns: 1fr 1fr 1fr;
			grid-auto-rows: 1fr 1fr;
			gap: 30px;
		}
		.topTile {
			height: 180px;
			width: 180px;
		}
		.name {
			font-size: 1rem;
		}
	}
</style>
