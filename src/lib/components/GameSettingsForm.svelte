<script lang="ts">
	import type { GameSettingsInput } from '$houdini/runtime/generated';
	import { gameSettingsStore } from '$lib/stores/gameSettingsStore';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher<never>();

	export let selectedIds: string[] = [];

	$: gameSettingsForm.selectedIds = selectedIds.map(id => parseInt(id));

	const gameSettingsForm: GameSettingsInput = {
		selectedIds: [],
		numberOfAlternatives: 5,
		inclDet: true,
		inclLog: true,
		inclSyll: true,
		cunToTranslit: true,
		translitToCun: true
	};

	function onStartGame(): void {
		gameSettingsStore.set(gameSettingsForm);
		dispatch('startGame');
	}
</script>

<form class="game-settings">
	<div>
		<label for="selIds">Selected characters:</label>
		<p>{gameSettingsForm.selectedIds.join(', ')}</p>
	</div>
	<div>
		<label for="numEx">Number of alternatives</label>
		<input
			id="numEx"
			name="number-of-alternatives"
			type="number"
			bind:value={gameSettingsForm.numberOfAlternatives}
		/>
	</div>
	<div>
		<label for="inclDet">Include determinatives</label>
		<input
			id="inclDet"
			name="include-determinatives"
			type="checkbox"
			bind:checked={gameSettingsForm.inclDet}
		/>
	</div>
	<div>
		<label for="inclLog">Include logograms</label>
		<input
			id="inclLog"
			name="include-logograms"
			type="checkbox"
			bind:checked={gameSettingsForm.inclLog}
		/>
	</div>
	<div>
		<label for="inclSyll">Include syllabograms</label>
		<input
			id="inclSyll"
			name="include-syllabograms"
			type="checkbox"
			bind:checked={gameSettingsForm.inclSyll}
		/>
	</div>
	<div>
		<label for="cunToTranslit">Cuneiform to transliteration</label>
		<input
			id="cunToTranslit"
			name="hittite-to-english"
			type="checkbox"
			bind:checked={gameSettingsForm.cunToTranslit}
		/>
	</div>
	<div>
		<label for="translitToCun">Transliteration to cuneiform</label>
		<input
			id="translitToCun"
			name="english-to-hittite"
			type="checkbox"
			bind:checked={gameSettingsForm.translitToCun}
		/>
	</div>
	<button type="button" on:click={onStartGame}>Start</button>
</form>

<style lang="scss">
	p {
		overflow-x: hidden;
	}
</style>
