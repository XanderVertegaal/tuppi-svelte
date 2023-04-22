<script lang="ts">
	import { browser } from "$app/environment";
	import { getExercisesStore, type getExercises$input, type getExercises$result, type QueryResult } from "$houdini";
	import type { GameSettingsInput } from "$houdini/runtime/generated";
	import Game from "$lib/components/Game.svelte";
	import SignCard from "$lib/components/SignCard.svelte";
	import { GameState, type Exercise } from "$lib/types";
	import { onMount } from "svelte";
	import type { PageData } from "./$houdini";
  export let data: PageData

  $: ({ allCharacters } = data);
  
  const exerciseStore = new getExercisesStore();

  async function fetchExercises(): Promise<QueryResult<getExercises$result, getExercises$input>> {
    return exerciseStore.fetch({
      variables: {
        input: gameSettingsForm
      },
      policy: "CacheAndNetwork"
    });
  }

  let gameState: GameState = GameState.PREPARING; 
  let exercises: Exercise[] = [];

  function selectIds(id: string): void {
    if (gameSettingsForm.selectedIds.includes(id)) {
      gameSettingsForm.selectedIds = gameSettingsForm.selectedIds.filter(cardId => cardId !== id);
      return;
    }
    gameSettingsForm.selectedIds = [...gameSettingsForm.selectedIds, id];
  }

  async function startGame(): Promise<void> {
    gameState = GameState.RUNNING;
    const results = await fetchExercises();
    exercises = results?.data?.exercises || [];
  }

  function handleGameResult(exercises: CustomEvent<Exercise[]>): void {
    console.log('Handling game result!');
    gameState = GameState.FINISHED;
  }

  const gameSettingsForm: GameSettingsInput = {
    selectedIds: [],
    numberOfExercises: 5,
    inclDet: false,
    inclLog: false,
    inclSyll: true,
    cunToTranslit: true,
    translitToCun: true
  }

</script>

{#if gameState === GameState.PREPARING}
<article class="game-preparation">
  <section class="selected-controls">
    {#if gameSettingsForm.selectedIds.length > 0}
    <form class="game-settings">
      <div>
        <label for="selIds">Selected characters:</label>
        <p>{gameSettingsForm.selectedIds.join(', ')}</p>
      </div>
      <div>
        <label for="numEx">Number of exercises</label>
        <input id="numEx" name="number-of-exercises" type="number" bind:value={gameSettingsForm.numberOfExercises}/>
      </div>
      <div>
        <label for="inclDet">Include determinatives</label>
        <input id="inclDet" name="include-determinatives" type="checkbox" bind:checked={gameSettingsForm.inclDet}/>
      </div>
      <div>
        <label for="inclLog">Include logograms</label>
        <input id="inclLog" name="include-logograms" type="checkbox" bind:checked={gameSettingsForm.inclLog}/>
      </div>
      <div>
        <label for="inclSyll">Include syllabograms</label>
        <input id="inclSyll" name="include-syllabograms" type="checkbox" bind:checked={gameSettingsForm.inclSyll}/>
      </div>
      <div>
        <label for="cunToTranslit">Cuneiform to transliteration</label>
        <input id="cunToTranslit" name="hittite-to-english" type="checkbox" bind:checked={gameSettingsForm.cunToTranslit}/>
      </div>
      <div>
        <label for="translitToCun">Transliteration to cuneiform</label>
        <input id="translitToCun" name="english-to-hittite" type="checkbox" bind:checked={gameSettingsForm.translitToCun}/>
      </div>
      <button type="button" on:click={startGame}>Start</button>
    </form>
    {/if}
  </section>
  
  {#if $allCharacters?.data?.allChars}
    <ul class="sign-card-list">
      {#each $allCharacters.data.allChars as character}
        <SignCard {character} selected={gameSettingsForm.selectedIds.includes(character.id)} on:select={event => selectIds(event.detail.id)} />
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

    p {
      overflow-x: hidden;
    }
  }

</style>