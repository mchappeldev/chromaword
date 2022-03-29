<script>
	import FaRegFrown from 'svelte-icons/fa/FaRegFrown.svelte';
	import FaRegMehRollingEyes from 'svelte-icons/fa/FaRegMehRollingEyes.svelte';
	import FaRegSmileBeam from 'svelte-icons/fa/FaRegSmileBeam.svelte';
	import FaLemon from 'svelte-icons/fa/FaLemon.svelte';
	import { guesses, boardData } from '../store.js';
	import { createClient } from '@supabase/supabase-js';
	export let visible = true;
	let difficultyStars = 0;
	let enjoy;
	$: correct = $boardData.boardAnswers.join('') == $guesses.join('').toLowerCase();

	const saveBoard = async () => {
		const supabaseUrl = 'https://izquajbrfmtjxoxgytor.supabase.co';
		const supabaseKey = import.meta.env.VITE_SUPABASE_KEY.toString();
		const supabase = createClient(supabaseUrl, supabaseKey);
		const { data } = await supabase
			.from('Boards')
			.insert([
				{ words: $boardData.boardWords, answers: $boardData.boardAnswers, ...$boardData.analysis }
			]);
		visible = false;
	};
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
	<div class="ratings flex">
		<h1>How was this board?</h1>
		<div class="flex enjoy">
			<div
				on:click={() => {
					enjoy = 1;
				}}
				class:filled={enjoy == 1}
				class="reactions"
			>
				<FaRegFrown />
			</div>
			<div
				on:click={() => {
					enjoy = 2;
				}}
				class:filled={enjoy == 2}
				class="reactions"
			>
				<FaRegMehRollingEyes />
			</div>
			<div
				on:click={() => {
					enjoy = 3;
				}}
				class:filled={enjoy == 3}
				class="reactions"
			>
				<FaRegSmileBeam />
			</div>
		</div>
		<h1>Was it Hard?</h1>
		<div class="difficulty flex">
			{#each Array(5) as lemon, i}
				<div
					class="lemon"
					on:click={() => {
						difficultyStars = i + 1;
					}}
					class:filled={difficultyStars >= i + 1}
				>
					<FaLemon />
				</div>
			{/each}
		</div>
	</div>

	<p>If you liked this board please consider adding it to our database below!</p>
</div>
<button on:click={saveBoard}>Save Board</button>

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
