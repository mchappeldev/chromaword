<script>
	import { selectedColor, guesses } from '../store.js';
	const colors = ['color0', 'color1', 'color2', 'color3', 'color4', 'color5'];
</script>

<div class="container">
	{#each colors as color, i}
		<!-- <div
			on:click={() => selectedColor.set(i)}
			class="colorSelector {color}"
			class:selected={$selectedColor === i}
		>
			{$guesses[i]}
		</div> -->
		<input
			on:click={() => selectedColor.set(i)}
			class="colorSelector {color}"
			class:selected={$selectedColor === i}
			type="text"
			bind:value={$guesses[i]}
		/>
	{/each}
</div>

<style>
	.container {
		display: flex;
		flex-direction: row;
		flex: 0 1;
		margin-top: 5vw;
		max-width: 10vw;
		height: 10vw;
		justify-content: center;
		align-items: center;
	}
	.colorSelector {
		display: flex;
		position: relative;
		flex: 0 1;
		max-height: 7vh;
		max-width: 7vh;
		border-radius: 150px;
		border: 2px solid #333;
		justify-content: center;
		align-items: center;
		box-shadow: 2px;
		background-color: white;
		font-size: 5vh;
		text-transform: uppercase;
		font-family: 'Open Sans';
		font-weight: 900;
		color: #fff;
		margin: 2vw;
		cursor: pointer;
		-webkit-text-stroke-width: 2px;
		-webkit-text-stroke-color: #333;
		box-shadow: 0px 3px 4px #666;
		top: 0;
		transition: all 0.25s ease-in-out;
		box-sizing: border-box;
		text-align: center;
		caret-color: transparent;
	}

	.colorSelector:hover {
		box-shadow: 0px 7px 7px #666;
		top: -3px;
	}
	.selected {
		box-shadow: 0px 7px 7px #666;
		border: 6px solid #333;
		top: -3px;
	}
	.color0 {
		background-color: hsl(0, 51%, 57%);
	}
	.color1 {
		background-color: hsl(30, 51%, 57%);
	}
	.color2 {
		background-color: hsl(60, 51%, 57%);
	}
	.color3 {
		background-color: hsl(120, 51%, 57%);
	}
	.color4 {
		background-color: hsl(240, 51%, 57%);
	}
	.color5 {
		background-color: hsl(275, 51%, 57%);
	}

	*:focus {
		outline: none;
	}
</style>
