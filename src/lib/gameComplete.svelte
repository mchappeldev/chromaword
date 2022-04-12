<script>
	import FaRegFrown from 'svelte-icons/fa/FaRegFrown.svelte';
	import FaRegMehRollingEyes from 'svelte-icons/fa/FaRegMehRollingEyes.svelte';
	import FaRegSmileBeam from 'svelte-icons/fa/FaRegSmileBeam.svelte';
	import FaLemon from 'svelte-icons/fa/FaLemon.svelte';
	import { guesses, boardData, reviewEnjoyment, reviewDifficulty } from '../store.js';
	import { supabase, loggedIn, userId } from '../utils/supabase';
	import loadNextBoard from '../utils/boards/loadNextBoard.js';
	export let visible = true;
	$: correct = $boardData.boardAnswers.join('') == $guesses.join('').toLowerCase();

	$: {
		$reviewEnjoyment = $reviewEnjoyment;
		$reviewDifficulty = $reviewDifficulty;
		if (loggedIn() && $reviewEnjoyment != 0) {
			(async () => {
				await supabase.rpc('upsertboardreview', {
					_userId: userId(),
					_boardId: $boardData.boardId,
					_enjoyment: $reviewEnjoyment,
					_difficulty: $reviewDifficulty
				});
			})();
		} else if ($reviewEnjoyment === 3) {
			(async () => {
				await supabase.from('Boards').insert({
					answers: $boardData.boardAnswers,
					words: $boardData.boardWords,
					...$boardData.analysis
				});
			})();
		}
	}
</script>

<div class="header">{correct ? 'You won!' : 'You lost!'}</div>
<div class="message">
	{#if correct}
		<p>
			{`You correctly guessed the following: ${$boardData.boardAnswers} That is awesome!`}
		</p>
	{:else}
		<p>
			{`You guessed the following: ${$guesses} and it was actually: ${$boardData.boardAnswers}! The words were ${$boardData.boardWords}.`}
		</p>
	{/if}
	<!-- <button on:click={sync}>Do Stuff</button> -->
	<div class="ratings flex">
		<h1>How was this board?</h1>
		<div class="flex enjoy">
			<div
				on:click={() => {
					$reviewEnjoyment = 1;
				}}
				class:filled={$reviewEnjoyment == 1}
				class="reactions"
			>
				<FaRegFrown />
			</div>
			<div
				on:click={() => {
					$reviewEnjoyment = 2;
				}}
				class:filled={$reviewEnjoyment == 2}
				class="reactions"
			>
				<FaRegMehRollingEyes />
			</div>
			<div
				on:click={() => {
					$reviewEnjoyment = 3;
				}}
				class:filled={$reviewEnjoyment == 3}
				class="reactions"
			>
				<FaRegSmileBeam />
			</div>
		</div>
		{#if loggedIn()}
			<h1>Was it Hard?</h1>
			<div class="difficulty flex">
				{#each Array(5) as lemon, i}
					<div
						class="lemon"
						on:click={() => {
							$reviewDifficulty = i + 1;
						}}
						class:filled={$reviewDifficulty >= i + 1}
					>
						<FaLemon />
					</div>
				{/each}
			</div>
		{/if}
	</div>
</div>
<button
	on:click={() => {
		loadNextBoard();
		visible = false;
	}}>Next Board</button
>

<style>
	.ratings {
		flex-direction: column;
	}
	.flex {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.enjoy {
		gap: 3em;
		width: 100%;
	}

	.reactions {
		color: #333;
		height: 48px;
		width: 48px;
	}
	.difficulty {
		gap: 5px;
	}
	.lemon {
		height: 32px;
		width: 32px;
		color: #333;
	}
	.filled {
		color: limegreen;
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
		margin-left: 1rem;
		margin-right: 1rem;
		margin-bottom: 3rem;
	}
</style>
