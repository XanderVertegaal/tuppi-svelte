<script lang="ts">
	import SignCard from '$lib/components/SignCard.svelte';
	import GameSettingsForm from '$lib/components/GameSettingsForm.svelte';
	import { goto } from '$app/navigation';
	import { gameSettingsStore } from '$lib/stores/gameSettingsStore';
	import type { PageServerData } from './$types';
	import type { SignProgress, UserSignProgress } from '@prisma/client';
	import Button from '@smui/button/src/Button.svelte';
	import Label from '@smui/list/src/Label.svelte';
	import Dialog, { Actions, Content, Title } from '@smui/dialog';

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

	function unlockChars(): void {
		console.log('Implement unlocking characters!');
	}
</script>


<div class="button-wrapper">
	<Button on:click={() => openGameSettings = true}>
		<Label>Settings</Label>
	</Button>
	<Button on:click={startGame}>
		<Label>Start game</Label>
	</Button>
	<Button on:click={unlockChars}>
		<Label>
			Unlock chars
		</Label>
	</Button>
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
				signProgresses={getProgressForCharacter(character.id)}
				unlocked={unlockedIds.includes(character.id)}
				selected={selectedIds.includes(character.id)}
				on:select={(event) => selectId(event.detail.id)}
			/>
		{/each}
	</ul>
{/if}

<Dialog
	bind:open={openGameSettings}
	aria-labelledby="modal-title"
	aria-describedby="modal-content"
>
	<Title id="modal-title">
		<h6>Game settings</h6>
	</Title>
	<Content id="modal-content">
		<GameSettingsForm bind:selectedIds on:confirm={() => openGameSettings = false} />
	</Content>
	<Actions>
		<Button on:SMUI:action={confirm}>Confirm</Button>
	</Actions>
</Dialog>

<style lang="scss">
	.sign-card-list {
		list-style: none;
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		gap: 1em;
		padding-left: 0;
	}

	.button-wrapper {
		display: flex;
		justify-content: center;
	}
</style>
