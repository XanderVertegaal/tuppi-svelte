<script lang="ts">
	import Game from "$lib/components/Game.svelte";
	import SignCard from "$lib/components/SignCard.svelte";
	import { GameState, type Exercise, type GameResult } from "$lib/types";
	import type { PageData } from "./$houdini";
	import { mockData } from "./mockData";
  import { SubmitGameResultStore, getExercisesStore } from '$houdini';
  import type { Question$options } from '$houdini';
	import GameSettingsForm from "$lib/components/GameSettingsForm.svelte";
	import type { GameSettingsInput } from "$houdini/runtime/generated";
  export let data: PageData

  $: ({ allCharacters } = data);
  
  const exerciseStore = new getExercisesStore();

  let gameState: GameState = GameState.PREPARING; 
  let exercises: Exercise[] = [];

  let selectedIds: number[] = [];

  function selectId(id: number): void {
    if (selectedIds.includes(id)) {
      selectedIds = selectedIds.filter(cardId => cardId !== id);
      return;
    }
    selectedIds = [...selectedIds, id];
  }

  async function startGame(gameSettings: GameSettingsInput): Promise<void> {
    gameState = GameState.RUNNING;
    const results = await exerciseStore.fetch({
      variables: {
        input: gameSettings
      },
      policy: "CacheAndNetwork"
    });
    exercises = results?.data?.exercises || [];
  }

  function handleGameResult(exercises: CustomEvent<Exercise[]>): void {
    console.log('Handling game result!', exercises.detail);
    gameState = GameState.FINISHED;
  }

  const submitGameResults = new SubmitGameResultStore();

  async function handleFakeGameResults(): Promise<void> {
    gameState = GameState.FINISHED;
    const mock = mockData;
    const requestData: GameResult[] = mock.map(exercise => {
      return {
        characterId: exercise.character.id,
        questionType: exercise.questionType as Question$options,
        correct: exercise.correct
      }
    })

    await submitGameResults.mutate({gameResults: requestData});
  }

</script>

<button on:click="{handleFakeGameResults}">Handle fake game results</button>

{#if gameState === GameState.PREPARING}
<article class="game-preparation">
  <section class="selected-controls">
    {#if selectedIds.length > 0}
    <GameSettingsForm bind:selectedIds={selectedIds} on:startGame={event => startGame(event.detail)} />
    {/if}
  </section>
  
  {#if $allCharacters?.data?.allChars}
    <ul class="sign-card-list">
      {#each $allCharacters.data.allChars as character}
        <SignCard {character} selected={selectedIds.includes(character.id)} on:select={event => selectId(event.detail.id)} />
      {/each}
    </ul>
  {:else if $allCharacters?.errors}
    <p>Could not load characters. Sorry about that!</p>
  {:else if $allCharacters?.fetching}
    <p>Loading characters...</p>
  {/if}
</article>

{:else if gameState === GameState.RUNNING}
  {#await exercises}
    <p>Loading game...</p>
  {:then}
    <Game {exercises} on:gameResult={($event) => handleGameResult($event)}/>
  {:catch}
    <p>Game could not be loaded. Sorry about that!</p>
  {/await}
  
{:else if gameState === GameState.FINISHED}
    <p>Game over!</p>

    <p>Score: {exercises.filter(exercise => exercise.correct).length}/{exercises.length}</p>
    <p>Mistakes:</p>
    <ul>
      {#each exercises.filter(exercise => !exercise.correct) as exercise}
        <li>{exercise.character.id} - {exercise.questionType}</li>
      {/each}
    </ul>

    <!-- <button type="button" on:click={startGame}>Restart</button> -->
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