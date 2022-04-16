<script>
	import { supabase } from '../utils/supabase';
	import FaUser from 'svelte-icons/fa/FaUser.svelte';
	import FaShareAlt from 'svelte-icons/fa/FaShareAlt.svelte';
	import FaQuestionCircle from 'svelte-icons/fa/FaQuestionCircle.svelte';
	import FaMedal from 'svelte-icons/fa/FaMedal.svelte';
	import Instructions from '$lib/instructions.svelte';
	// @ts-ignore
	import Leaderboard from '$lib/leaderboard.svelte';
	import Modal from '$lib/modal.svelte';
	import { boardData, boardFinished } from '../store';
	import { fly, fade } from 'svelte/transition';
	import { browser } from '$app/env';

	// @ts-ignore
	let loggedIn = supabase.auth.currentUser?.aud === 'authenticated';
	let showInstructions = false;
	let showLeaderboard = false;
	let shareMessage;
	let sharingLink;

	async function getSharingLink() {
		if (!$boardData.boardId) {
			const { data, error } = await supabase.from('Boards').insert({
				answers: $boardData.boardAnswers,
				words: $boardData.boardWords,
				...$boardData.analysis
			});
			if (error) {
				shareMessage = 'Sorry, your connection was interrupted.';
			} else {
				$boardData.boardId = data[0].id;
				// We already recorded that you completed this board, but didn't have a boardId at the time. Must add it now.
				if ($boardFinished && browser) {
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
			}
		}
		shareMessage = 'Link Copied';
		sharingLink = `https://www.chromaword.com/board/${$boardData.boardId}`;
		if (localStorage.getItem('ref'))
			sharingLink = sharingLink + '?ref=' + localStorage.getItem('ref');
		try {
			await navigator.clipboard.writeText(sharingLink);
		} catch (error) {
			setTimeout(async () => await navigator.clipboard.writeText(sharingLink));
		}
	}
	$: {
		sharingLink = sharingLink;
		if (sharingLink) {
			setTimeout(() => {
				sharingLink = '';
			}, 2000);
		}
	}
</script>

<div class="navBar">
	<div class="left">
		<!-- <div class="icon"><FaBars /></div> -->

		<a class={loggedIn ? 'loggedIn icon' : 'icon'} href={loggedIn ? '/profile' : '/login'}
			><FaUser /></a
		>
		<div class="icon" on:click={() => (showLeaderboard = true)}><FaMedal /></div>
	</div>
	<div class="header"><h1>ChromaWord</h1></div>
	<div class="right">
		<div class="icon" on:click={getSharingLink}><FaShareAlt /></div>
		<div class="icon" on:click={() => (showInstructions = true)}><FaQuestionCircle /></div>
		{#if sharingLink}<div class="shareMessage" transition:fade={{ duration: 1000 }}>
				{shareMessage}
			</div>{/if}
	</div>

	{#if showInstructions}
		<Modal bind:visible={showInstructions}>
			<Instructions bind:visible={showInstructions} />
		</Modal>
	{/if}
	{#if showLeaderboard}
		<Modal bind:visible={showLeaderboard}>
			<Leaderboard bind:visible={showLeaderboard} />
		</Modal>
	{/if}
</div>

<style>
	.shareMessage {
		background-color: hsl(0, 69%, 69%);
		border-radius: 0.3rem;
		color: #fff;
		font-size: 12px;
		font-weight: 700;
		padding: 5px;
		position: absolute;
		text-align: center;
		top: 50px;
		width: 5rem;
	}
	.left {
		display: flex;
		gap: 5px;
		justify-content: start;
		margin-left: 5px;
		width: 100px;
	}
	.right {
		display: flex;
		gap: 5px;
		justify-content: end;
		margin-right: 5px;
		position: relative;
		width: 100px;
	}
	h1 {
		/* height: 50px; */
		/* line-height: 53px; */
		/* width: 390px; */
		font-family: 'Passion One';
		font-size: min(10vw, 48px);
		font-style: normal;
		font-weight: 400;
		margin-bottom: 0px;
		margin-top: 0px;
		text-align: center;
		text-transform: uppercase;

		background: linear-gradient(
			90deg,
			#e57878 24.62%,
			#e59978 34.09%,
			#e5da78 44.08%,
			#6fcf96 54.34%,
			#78b7e5 64.34%,
			#bf7dd6 75.13%
		);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.navBar {
		align-items: center;
		display: flex;
		justify-content: space-between;
		margin-bottom: 0.5rem;
		margin-top: 0.5rem;

		position: relative;
		width: 100%;
		z-index: 999;
		border-bottom: 1px solid #eee;
	}
	.icon {
		color: #444;
		cursor: pointer;
		height: 1rem;
		width: 1rem;
		background-color: #eee;
		padding: 0.5rem;
		border-radius: 0.5rem;
		transition: all 0.25s ease-in-out;
	}
	.loggedIn {
		color: #6fcf96;
	}

	@media only screen and (min-width: 410px) and (min-height: 650px) {
		.icon {
			height: 1.25rem;
			width: 1.25rem;
			padding: 0.5rem;
		}
		.left {
			gap: 7.5px;
			margin-left: 10px;
		}
		.right {
			gap: 7.5px;
			margin-right: 10px;
		}
	}

	@media only screen and (min-width: 750px) and (min-height: 750px) {
		.icon {
			height: 1.5rem;
			width: 1.5rem;
			padding: 0.5rem;
		}
		.left {
			gap: 10px;
			margin-left: 15px;
		}
		.right {
			gap: 10px;
			margin-right: 15px;
		}
	}
</style>
