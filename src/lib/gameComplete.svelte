<script>
	import FaRegFrown from 'svelte-icons/fa/FaRegFrown.svelte';
	import FaRegMehRollingEyes from 'svelte-icons/fa/FaRegMehRollingEyes.svelte';
	import FaRegSmileBeam from 'svelte-icons/fa/FaRegSmileBeam.svelte';
	import FaLemon from 'svelte-icons/fa/FaLemon.svelte';
	import FaLongArrowAltRight from 'svelte-icons/fa/FaLongArrowAltRight.svelte';
	import { guesses, boardData, reviewEnjoyment, reviewDifficulty } from '../store.js';
	import { supabase, loggedIn, userId } from '../utils/supabase';
	import LoadNextBoard from '../utils/boards/loadNextBoard.svelte';
	import { browser } from '$app/env';
	import { onDestroy } from 'svelte';
	export let visible = true;
	$: correct = $boardData.boardAnswers.join('') == $guesses.join('').toLowerCase();

	let readyForNextBoard = false;

	async function addBoard() {
		const { data } = await supabase.from('Boards').insert({
			answers: $boardData.boardAnswers,
			words: $boardData.boardWords,
			...$boardData.analysis
		});
		$boardData.boardId = data[0].id;
	}

	async function submitReview() {
		await supabase.rpc('upsertboardreview', {
			_userId: userId(),
			_boardId: $boardData.boardId,
			_enjoyment: $reviewEnjoyment,
			_difficulty: $reviewDifficulty
		});
	}

	async function addBoardIdToGameComplete() {
		const { data: lastBoardComplete } = await supabase
			.from('BoardsComplete')
			.select('id')
			.eq('deviceId', localStorage.getItem('deviceId'))
			.is('boardId', null)
			.order('created_at', { ascending: false })
			.limit(1)
			.single();
		await supabase
			.from('BoardsComplete')
			.update({ boardId: $boardData.boardId })
			.eq('id', lastBoardComplete.id);
	}

	onDestroy(async () => {
		if (browser && ($reviewDifficulty || $reviewEnjoyment)) {
			if (loggedIn() && $boardData.boardId && $reviewEnjoyment != 0) {
				await submitReview();
			} else if ($reviewEnjoyment === 3 && !$boardData.boardId) {
				await addBoard();
				if (loggedIn()) await submitReview();
				await addBoardIdToGameComplete();
			}
		}
		if (readyForNextBoard) nextBoard.load();
	});

	let nextBoard;
</script>

<div class="header">{correct ? 'Nailed it!' : 'You Failed!'}</div>
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
	{/if}
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
		readyForNextBoard = true;
		visible = false;
	}}>Next Board</button
>
{#if !loggedIn()}
	<p>Want to track your stats and review boards?</p>
	<div class="loginPrompt">
		<div class="signupLink"><a href="/login">Login</a></div>
		<div>or</div>
		<div class="signupLink"><a href="/signup">Create a free account</a></div>
	</div>
{/if}
<LoadNextBoard bind:this={nextBoard} />

<style>
	h2 {
		margin: 10px;
	}
	p {
		margin: 0;
		font-size: 14px;
	}
	.loginPrompt {
		margin-bottom: 2rem;
		display: flex;
		flex-direction: row;
		gap: 0.5rem;
		font-size: 14px;
	}
	.signupLink {
		color: hsl(144, 50%, 62%);
		font-weight: 900;
	}
	.signupLink:hover {
		color: hsl(144, 50%, 50%);
	}
	.icon {
		display: flex;
		flex-direction: column;
		justify-content: center;
		width: 16px;
	}

	.ratings {
		flex-direction: column;
		margin: 20px 0px;
	}

	.flex {
		align-items: center;
		display: flex;
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
		cursor: pointer;
	}
	.reactions:hover {
		color: #6fcf96;
	}

	.difficulty {
		gap: 5px;
	}

	.lemon {
		height: 32px;
		width: 32px;
		color: #333;
		cursor: pointer;
	}
	.lemon:hover {
		color: #6fcf96;
	}

	.filled {
		color: #6fcf96;
	}

	button {
		align-items: center;
		background: linear-gradient(
			90deg,
			#e57878 0%,
			#e59978 21.35%,
			#e5da78 40.63%,
			#6fcf96 61.46%,
			#78b7e5 80.73%,
			#bf7dd6 100%
		);
		border-radius: 5px;
		border: none;
		box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
		color: #ffffff;
		cursor: pointer;
		display: flex;
		font-family: 'Open Sans';
		font-size: 24px;
		font-style: normal;
		font-weight: 600;
		height: 40px;
		justify-content: center;
		left: 120px;
		letter-spacing: 0.245em;
		line-height: 100%;
		margin-top: 40px;
		margin: 20px;
		padding: 20px;
		text-align: center;
		text-transform: uppercase;
		top: 549px;
	}

	.header {
		font-family: 'Open Sans';
		font-size: 1.75rem;
		font-weight: 600;
		margin-left: 1rem;
		margin-right: 1rem;
		margin-top: 1.5rem;
	}

	.message {
		font-family: 'Open Sans';
		font-weight: 400;
		margin-left: 1rem;
		margin-right: 1rem;
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
		flex-direction: row;
		justify-content: space-between;
		text-transform: capitalize;
		width: 250px;
	}

	.word {
		text-align: left;
		width: 50px;
	}
</style>
