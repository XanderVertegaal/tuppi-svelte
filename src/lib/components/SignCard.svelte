<script lang="ts">
	import type { CharacterWithLogDet } from '$lib/types';
	import { fontsetMapping, masteryDisplayMapping, renderUnicode } from '$lib/utils';
	import { FontSet, Sign, type SignProgress } from '@prisma/client';
	import { createEventDispatcher } from 'svelte';

	export let character: CharacterWithLogDet;
	export let signProgresses: SignProgress[];
	export let selected = false;
	export let fontSet: FontSet = FontSet.ULLIKUMMI_A;
	export let unlocked = false;
	
	let syllRank: string | null = null;
	let logRank: string | null = null;
	let detRank: string | null = null;
	
	$: if (signProgresses) {
		unlocked = true;
		syllRank = getMasteryDisplay('SYLLABOGRAM');
		logRank = getMasteryDisplay('LOGOGRAM');
		detRank = getMasteryDisplay('DETERMINATIVE');
	}

	const dispatch = createEventDispatcher<{ select: { id: number } }>();

	function selectCharacter() {
		dispatch('select', { id: character.id });
	}

	function getMasteryDisplay(signType: Sign): string {
		const mastery = signProgresses.find(progress => progress.sign === signType)?.mastery;
		return mastery ? masteryDisplayMapping[mastery - 1] : '';
	}

</script>

<section class="char-card" class:selected class:unlocked>
	<span class="char-id">#{character.id}</span>
	<a href="/characters/{character.id}">
		<h2 class="char {fontsetMapping[fontSet]}">{renderUnicode(character.unicode)}</h2>
	</a>

	{#if unlocked && signProgresses.length > 0}
		{#if character.syllValues && syllRank}
			<p class="progress">Syll: {syllRank}</p>
		{/if}
		{#if character.logValues.length > 0 && logRank}
			<p class="progress">Log: {logRank}</p>
		{/if}
		{#if character.detValues.length > 0 && detRank}
			<p class="progress">Det: {detRank}</p>
		{/if}
		<button type="button" on:click={selectCharacter}>{selected ? 'Selected' : 'Select'}</button>
	{:else}
		<p>🔒</p>
	{/if}
</section>

<style lang="scss">
	.char-card {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100px;
		border-radius: 10px;
		background-color: #f0f0f0;
		padding: 10px 0;

		a {
			text-decoration: none;
			color: black;
		}

		&.selected {
			background-color: #979797;
		}

		.char-id {
			position: absolute;
			top: 5px;
			right: 5px;
			color: #777;
		}

		.char {
			font-size: 1.5em;
			text-align: center;
			margin-bottom: 10px;
		}

		button {
			&:not(:last-child) {
				margin-bottom: 5px;
			}

			a {
				text-decoration: none;
				color: black;
			}
		}

		.progress {
			margin: 0 0 5px 0;
		}
	}
</style>
