<script lang="ts">
	import { gameSettingsStore } from '$lib/stores/gameSettingsStore';
	import type { GameSettingsInput } from '$lib/types';
	import { createEventDispatcher } from 'svelte';
	import Textfield from '@smui/textfield';
	import FormField from '@smui/form-field';
	import Checkbox from '@smui/checkbox';

	const dispatch = createEventDispatcher<never>();

	export let selectedIds: number[] = [];

	$: gameSettingsForm.selectedIds = selectedIds;

	const gameSettingsForm: GameSettingsInput = {
		selectedIds: [],
		numberOfAlternatives: 5,
		inclDet: true,
		inclLog: true,
		inclSyll: true,
		cunToTranslit: true,
		translitToCun: true,
		multipleChoice: true,
		writtenExercise: true
	};

	function confirm(): void {
		gameSettingsStore.set(gameSettingsForm);
		dispatch('confirm');
	}
</script>

<form class="game-settings">
	<Textfield
		type="number"
		variant="standard"
		label="Number of alternatives"
		bind:value={gameSettingsForm.numberOfAlternatives}
	/>

	<FormField>
		<Checkbox 
			input$name="include-determinatives" 
			bind:checked={gameSettingsForm.inclDet} />
		<span slot="label">Include determinatives</span>
	</FormField>

	<FormField>
		<Checkbox
			input$name="include-logograms"
			bind:checked={gameSettingsForm.inclLog} />
		<span slot="label">Include logograms</span>
	</FormField>

	<FormField>
		<Checkbox
			input$name="include-syllabograms"
			bind:checked={gameSettingsForm.inclSyll} />
		<span slot="label">Include syllabograms</span>
	</FormField>

	<FormField>
		<Checkbox
			input$name="hittite-to-english"
			bind:checked={gameSettingsForm.cunToTranslit} />
		<span slot="label">Cuneiform to transliteration</span>
	</FormField>

	<FormField>
		<Checkbox
			input$name="english-to-hittite"
			bind:checked={gameSettingsForm.translitToCun} />
		<span slot="label">Transliteration to cuneiform</span>
	</FormField>
</form>
