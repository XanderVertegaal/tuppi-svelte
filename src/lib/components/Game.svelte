<script lang="ts">
	import type { getExercises$result } from "$houdini";
	import type { Answer, Exercise, Mutable } from "$lib/types";
	import { renderUnicode } from "$lib/utils";
	import { createEventDispatcher } from "svelte";
  
  const dispatch = createEventDispatcher();

  export let exercises: Mutable<Exercise[]>;
  let selectedExercise: Mutable<getExercises$result['exercises'][number]> | null = null;

  $: totalExercises = exercises.length;
  let currentExerciseNo = 1;

  $: if (exercises) {
    console.log(exercises);
    selectNewExercise(exercises);
  }

  function selectNewExercise(exercises: Exercise[]): void {
    const newExercise = exercises.find(exercise => exercise.correct === false);
    if (newExercise) {
      selectedExercise = newExercise;
    } else {
      dispatch('gameResult', exercises);
    }
  }

  function checkAnswer(answer: Answer): void {
    if (!selectedExercise) {
      return;
    }
    if (answer.correct) {
      selectedExercise.correct = true;
    } else {
      selectedExercise.correct = false;
      totalExercises++;
    }
    currentExerciseNo++;
    selectNewExercise(exercises);
  }
</script>

{#if selectedExercise}
  <h5>Exercise {currentExerciseNo} of {totalExercises}</h5>
  {#if selectedExercise.questionType.startsWith('TRANS_TO_CUN')}
    <h2>{selectedExercise.character.syllValues?.join(', ')}</h2>
    <h3>Select the corresponding cuneiform sign</h3>
    <ul class="answers">
      {#each selectedExercise.answers as answer}
      <li><button type="button" class="cuneiform" on:click={() => checkAnswer(answer)}>{renderUnicode(answer.displayValue)}</button></li>
      {/each}
    </ul>
  {:else}
    <h2 class="cuneiform">{renderUnicode(selectedExercise.character.unicode)}</h2>
    <h3>Select the corresponding transliteration</h3>
    <ul class="answers">
      {#each selectedExercise.answers as answer}
      <li><button type="button" on:click={() => checkAnswer(answer)}>{answer.displayValue}</button></li>
      {/each}
    </ul>
  {/if}
{:else}
  <p>There are no more exercises to do.</p>
{/if}

<style lang="scss">
  h2 {
    text-align: center;
  }

  .answers {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      margin: 0.5rem;
      padding: 0.5rem;
      border: 1px solid black;
      border-radius: 0.5rem;
      cursor: pointer;

      &:hover {
        background-color: #eee;
      }

      button {
        border: 0;
        background: white;

        &.cuneiform {
        font-size: 24px;
        }
      }
    }
  }
</style>