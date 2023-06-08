<script lang="ts">
	import SignCard from '$lib/components/SignCard.svelte';
	import type { PageData } from './$houdini';
	import GameSettingsForm from '$lib/components/GameSettingsForm.svelte';
	import { goto } from '$app/navigation';
	import { gameSettingsStore } from '$lib/stores/gameSettingsStore';

	export let data: PageData;

	$: ({ allCharacters } = data);

	let selectedIds: string[] = [];

	function selectId(id: string): void {
		if (selectedIds.includes(id)) {
			selectedIds = selectedIds.filter((cardId) => cardId !== id);
			return;
		}
		selectedIds = [...selectedIds, id];
	}

	async function startGame(): Promise<void> {
		goto('/game');
	}

	function startMockGame(): void {
		console.log('Starting mock game!');
		gameSettingsStore.set({
			cunToTranslit: true,
			translitToCun: true,
			inclDet: true,
			inclLog: true,
			inclSyll: true,
			numberOfAlternatives: 5,
			selectedIds: ['1', '2']
		});
		startGame();
	}
</script>

<button type="button" on:click={startMockGame}>Start mockGame</button>

{#if selectedIds.length > 0}
	<article class="game-preparation">
		<section class="selected-controls">
			<GameSettingsForm bind:selectedIds on:startGame={startGame} />
		</section>
	</article>
{/if}

{#if $allCharacters?.data?.allChars}
	<ul class="sign-card-list">
		{#each $allCharacters.data.allChars as character}
			<SignCard
				{character}
				selected={selectedIds.includes(character.id)}
				on:select={(event) => selectId(event.detail.id)}
			/>
		{/each}
	</ul>
{:else if $allCharacters?.errors}
	<p>Could not load characters. Sorry about that!</p>
{:else if $allCharacters?.fetching}
	<p>Loading characters...</p>
{/if}

<style lang="scss">
	.sign-card-list {
		list-style: none;
		display: flex;
		flex-wrap: wrap;
		gap: 1em;
	}

	.selected-controls {
		display: flex;
		justify-content: space-between;
	}
</style>
