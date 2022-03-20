<script>
	const rows = [
		['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
		['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
		['enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'backspace']
	];
</script>

<div class="keyboard">
	{#each rows as row}
		<div class="row">
			{#each row as key}
				<div class="key">{key}</div>
			{/each}
		</div>
	{/each}
</div>

<style>
	.keyboard {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		width: 95vw;
		max-width: 500px;
		max-height: 200px;
		height: 40vw;
		flex-shrink: 3;
		margin-top: 30px;
		gap: 10px;
	}
	.row {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		width: 100%;
		flex: 0 1 auto;
		height: 100%;
		gap: 5px;
	}
	.key {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
		width: 100%;
		background: #a9a9a9;
		font-family: 'Open Sans';
		font-weight: 900;
		color: white;
		border-radius: 5px;
		text-transform: uppercase;
		font-size: 2vh;
	}
</style>
