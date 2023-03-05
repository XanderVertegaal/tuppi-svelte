<script lang="ts">
	import type { Exercise } from "$lib/types";
	import { renderUnicode, shuffleArray } from "$lib/utils";
	import { createEventDispatcher } from "svelte";

  interface AnswerData {
    promptChar: string;
    correct: string;
    allAnswers: string[];
  }

  export let exercises: Exercise[];
  let selectedExercise: Exercise | null = null;
  let answerData: AnswerData = { 
    promptChar: '', 
    correct: '', 
    allAnswers: [] 
  };

  const dispatch = createEventDispatcher();

  function formatAnswers(exercise: Exercise): AnswerData {
    const answerData: AnswerData = {
      promptChar: '',
      correct: '',
      allAnswers: []
    };

    switch (exercise.questionType) {
      case 'eng-2-hitt-syll':
        answerData.promptChar = exercise.character.syllabograph.join(', ')
        answerData.correct = exercise.character.cuneiform.unicode;
        answerData.allAnswers.push(...exercise.answers);
        break;
      case 'hitt-2-eng-syll':
        answerData.promptChar = exercise.character.cuneiform.unicode;
        answerData.correct = exercise.character.syllabograph.join(', ');
        answerData.allAnswers.push(...exercise.answers);
        break;
      case 'eng-2-hitt-log':
        answerData.promptChar = exercise.character.logograph.map(log => log.logTransliteration).join(', ');
        answerData.correct = exercise.character.cuneiform.unicode;
        answerData.allAnswers.push(...exercise.answers);
        break;
      case 'hitt-2-eng-log':
        answerData.promptChar = exercise.character.cuneiform.unicode;
        answerData.correct = exercise.character.logograph.map(log => log.logTransliteration).join(', ');
        answerData.allAnswers.push(...exercise.answers);
        break;
      default:
        break;
    }

    answerData.allAnswers = shuffleArray(answerData.allAnswers);
    return answerData;
  }

  $: if (exercises) {
    selectNewExercise();
  }

  function selectNewExercise(): void {
    const newExercise = exercises.find(exercise => exercise.correct === false);
    if (newExercise) {
      selectedExercise = newExercise;
      answerData = formatAnswers(newExercise);
    } else {
      dispatch('gameResult', exercises);
    }
  }

  function checkAnswer(answer: string): void {
    if (!selectedExercise) {
      return;
    }
    console.log({answerData})
    if (answer === answerData.correct) {
      selectedExercise.correct = true;
      console.log('Correct!')
    } else {
      console.log('False!', answer, answerData.correct)
      selectedExercise.correct = false;
    }
    selectNewExercise();
  }
</script>

{#if selectedExercise && answerData}
  {#if selectedExercise.questionType.startsWith('eng-2-hitt')}
    <h2>{answerData.promptChar}</h2>
    <h3>Select the corresponding cuneiform sign</h3>
    <ul class="answers">
      {#each answerData.allAnswers as answer}
      <li><button type="button" class="cuneiform" on:click={() => checkAnswer(answer)}>{renderUnicode(answer)}</button></li>
      {/each}
    </ul>
  {:else}
    <h2 class="cuneiform">{renderUnicode(answerData.promptChar)}</h2>
    <h3>Select the corresponding transliteration</h3>
    <ul class="answers">
      {#each answerData.allAnswers as answer}
      <li><button type="button" on:click={() => checkAnswer(answer)}>{answer}</button></li>
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