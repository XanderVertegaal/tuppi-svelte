<script lang="ts">
	import SignCard from '$lib/components/SignCard.svelte';
	import GameSettingsForm from '$lib/components/GameSettingsForm.svelte';
	import { goto } from '$app/navigation';
	import { gameSettingsStore } from '$lib/stores/gameSettingsStore';
	import type { PageServerData } from './$types';
	import type { SignProgress, UserSignProgress } from '@prisma/client';

	export let data: PageServerData;

	let dialog: HTMLDialogElement;

	$: ({ allChars, userSignProgresses } = data);

	let selectedIds: number[] = [];
	let unlockedIds: number[] = [];

	let openGameSettings = false;
	
	$: if (userSignProgresses) {
		unlockedIds = userSignProgresses.map(userSignProgress => userSignProgress.characterId);
	}

	$: if (openGameSettings === false) {
		selectedIds = [];
	}

	function selectId(id: number): void {
		if (selectedIds.includes(id)) {
			selectedIds = selectedIds.filter((cardId) => cardId !== id);
			return;
		}
		selectedIds = [...selectedIds, id];
	}

	async function startGame(): Promise<void> {
		if ($gameSettingsStore === null || $gameSettingsStore.selectedIds.length === 0) {
			gameSettingsStore.set({
				cunToTranslit: true,
				translitToCun: true,
				inclDet: true,
				inclLog: true,
				inclSyll: true,
				numberOfAlternatives: 5,
				multipleChoice: true,
				writtenExercise: true,
				selectedIds: unlockedIds
			});
		}
		goto('/game');
	}

	function getProgressForCharacter(characterId: number): SignProgress[] {
		return userSignProgresses?.find(userSignProgress => userSignProgress.characterId === characterId)?.signProgress ?? [];
	}


</script>

<div class="button-wrapper">
	<button type="button" on:click={() => dialog.showModal()}>Configure game</button>
	<button type="button" on:click={startGame}>Start game</button>
</div>


{#if openGameSettings === true}
	<article class="game-preparation">
		<section class="selected-controls">
			<GameSettingsForm bind:selectedIds on:startGame={startGame} />
		</section>
	</article>
{/if}

{#if selectedIds.length > 0}
	<p>Selected characters: <span>{selectedIds.join(', ')}</span></p>
{/if}

{#if allChars}
	<ul class="sign-card-list">
		{#each allChars as character}
			<SignCard
				{character}
				{openGameSettings}
				signProgresses={getProgressForCharacter(character.id)}
				unlocked={unlockedIds.includes(character.id)}
				selected={selectedIds.includes(character.id)}
				on:select={(event) => selectId(event.detail.id)}
			/>
		{/each}
	</ul>
{/if}

<dialog bind:this={dialog}>
	<article class="game-preparation">
		<section class="selected-controls">
			<GameSettingsForm bind:selectedIds on:confirm={() => dialog.close()} />
		</section>
	</article>
</dialog>

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
