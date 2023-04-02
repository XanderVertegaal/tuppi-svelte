<script lang="ts">
	import { browser } from "$app/environment";
	import { trainer_allCharsStore } from "$houdini";
	import Game from "$lib/components/Game.svelte";
	import SignCard from "$lib/components/SignCard.svelte";
	import { GameState, type Exercise } from "$lib/types";
	import { get } from "svelte/store";
	import type { CreateExercise } from "../api/create-exercise/+server";
  import type { PageData } from './$houdini';
  export let data: PageData;

  $: ({trainer_allChars} = data);

  let gameState: GameState = GameState.PREPARING; 
  let selectedIds: string[] = [];
  let exercises: Exercise[] = [];

  function selectIds(id: string): void {
    if (selectedIds.includes(id)) {
      selectedIds = selectedIds.filter(cardId => cardId !== id);
      return;
    }
    selectedIds = [...selectedIds, id];
  }

  async function startGame(): Promise<void> {
    gameState = GameState.RUNNING;

    if (browser) {
      const requestBody: CreateExercise = {
        selectedIds,
        gameSettings: {
          determiners: true,
          logograms: true,
          syllabograms: true,
          numberOfAlternatives: 7
        }
      }

      const response = await fetch('api/create-exercise', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });
  
      const json = await response.json() as Exercise[];
      exercises = json;
    };
  }

  function handleGameResult(exercises: CustomEvent<Exercise[]>): void {
    console.log('Handling game result!');
    gameState = GameState.FINISHED;
  }

</script>

{#if gameState === GameState.PREPARING}
<article class="game-preparation">
  <section class="selected-controls">
    <p>Selected characters: {selectedIds.join(', ')}</p>
    
    {#if selectedIds.length > 0}
    <button on:click={startGame}>Start</button>
    {/if}
  </section>
  
  {#if $trainer_allChars?.data?.allChars}
    <ul class="sign-card-list">
      {#each $trainer_allChars.data.allChars as character}
        <SignCard {character} selected={selectedIds.includes(character.id)} on:select={event => selectIds(event.detail.id)} />
      {/each}
    </ul>
  {:else if $trainer_allChars?.errors}
    <p>Could not load characters. Sorry about that!</p>
  {:else if $trainer_allChars?.fetching}
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