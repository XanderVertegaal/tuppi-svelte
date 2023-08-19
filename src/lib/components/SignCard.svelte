<script lang="ts">
	import type { CharacterWithLogDet } from '$lib/types';
	import { fontsetMapping, masteryDisplayMapping, renderUnicode } from '$lib/utils';
	import { FontSet, Sign, type SignProgress } from '@prisma/client';
	import { createEventDispatcher } from 'svelte';
	import Card, { Actions, Content, Media, PrimaryAction } from '@smui/card';
	import Button, { Label } from '@smui/button';

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

	function selectCharacter(event: Event) {
		dispatch('select', { id: character.id });
	}

	function getMasteryDisplay(signType: Sign): string {
		const mastery = signProgresses.find(progress => progress.sign === signType)?.mastery;
		return mastery ? masteryDisplayMapping[mastery - 1] : '';
	}

</script>

<div>
	<Card class="char-card">
		<PrimaryAction on:click={selectCharacter}>
			<Media>
				<a class="char-link" href="/characters/{character.id}">
					<h2 class="char {fontsetMapping[fontSet]}">{renderUnicode(character.unicode)}</h2>
				</a>
			</Media>
			<Content class='card-content mdc-typography--body2'>
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
					<p class="lock">🔒</p>
				{/if}
			</Content>
		</PrimaryAction>
		<Actions>
			<Button class="full-width" on:click={selectCharacter} variant={selected ? 'outlined' : 'raised'}>
				<Label>{selected ? 'Selected' : 'Select'}</Label>
			</Button>
		</Actions>
	</Card>
</div>

<style lang="scss">

	// Only picked up if the card is wrapped in another element.
	* :global(.mdc-card) {
		width: 120px;
		max-width: 100%;
	}

	* :global(.full-width) {
		width: 100%;
	}

	.char-link {
		text-decoration: none;
		color: inherit;

		h2 {
			text-align: center;
			font-size: 2rem;
			margin: 1rem 0.5rem 0;
		}
	}

	.lock {
		text-align: center;
		margin: 0;
	}
</style>
