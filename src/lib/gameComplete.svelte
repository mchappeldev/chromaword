<script>
	import FaRegFrown from 'svelte-icons/fa/FaRegFrown.svelte';
	import FaRegMehRollingEyes from 'svelte-icons/fa/FaRegMehRollingEyes.svelte';
	import FaRegSmileBeam from 'svelte-icons/fa/FaRegSmileBeam.svelte';
	import FaLemon from 'svelte-icons/fa/FaLemon.svelte';
	import FaLongArrowAltRight from 'svelte-icons/fa/FaLongArrowAltRight.svelte';
	import { guesses, boardData, reviewEnjoyment, reviewDifficulty, answers } from '../store.js';
	import { supabase, loggedIn, userId } from '../utils/supabase';
	import LoadNextBoard from '../utils/boards/loadNextBoard.svelte';
	import { map } from 'lodash';
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
	let nextBoard;
</script>

<div class="header">{correct ? 'Nailed it!' : 'Ouch!'}</div>
<div class="message">
	{#if correct}
		<p>
			{`You guessed correctly! That is awesome! Great work! :)`}
		</p>
	{:else}
		<div class="guess-container">
			<div class="guessed">
				<div class="row">
					<h3>Guessed</h3>
					<h3>Answers</h3>
				</div>
				{#each $boardData.boardWords.map((word) => {
					let newWord = word;
					for (let i = 0; i < 6; i++) {
						newWord = newWord.replace($boardData.boardAnswers[i], $guesses[i]);
					}
					return newWord;
				}) as word, i}
					<div class="row">
						<div class="word">{word}</div>
						<div class="icon"><FaLongArrowAltRight /></div>
						<div class="word">{$boardData.boardWords[i]}</div>
					</div>
				{/each}
			</div>
		</div>
		<!-- {`You guessed the following: ${$guesses} and it was actually: ${$boardData.boardAnswers}! The words were ${$boardData.boardWords}.`} -->
	{/if}
	<!-- <button on:click={sync}>Do Stuff</button> -->
	<div class="ratings flex">
		<h2>How was this board?</h2>
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
			<h2>Was it Hard?</h2>
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
		nextBoard.load();
		visible = false;
	}}>Next Board</button
>
<LoadNextBoard bind:this={nextBoard} />

<style>
	.icon {
		width: 16px;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
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
		height: 36px;
		width: 36px;
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
	.guess-container {
		display: flex;
		justify-content: space-around;
		margin-top: 15px;
	}
	.guessed {
		display: flex;
		flex-direction: column;
	}
	.row {
		display: flex;
		justify-content: space-between;
		flex-direction: row;
		width: 250px;
		text-transform: capitalize;
	}
	.word {
		width: 50px;
		text-align: left;
	}
</style>
