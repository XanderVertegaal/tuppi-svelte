<script lang="ts">
	import { SubmitGameResultStore, type Question$options } from '$houdini';
	import { GameState, type Answer, type GameResult, type Mutable, type Exercise } from '$lib/types';
	import { renderUnicode } from '$lib/utils';
	import { onMount } from 'svelte';
	import { mockData } from '../characters/mockData';

	export let data;

	export let exercises: Mutable<Exercise[]> = data.exercises ?? [];
	let selectedExerciseIndex = 0;
	let seenExercises: Exercise[] = [];

	const submitGameResults = new SubmitGameResultStore();

	let gameState: GameState = GameState.RUNNING;

  $: selectedExercise = exercises[selectedExerciseIndex]
	$: totalSeenExercises = seenExercises.length;

	$: if (exercises) {
		console.log('Exercises updated:', exercises);
		selectNewExercise(exercises);
	}

  onMount(() => {
    function handleKeydown(event: KeyboardEvent): void {
      console.log('Key pressed!');
      if (!selectedExercise) {
        return;
      }

      const pressedKey = parseInt(event.key)
      if (isNaN(pressedKey) || pressedKey > selectedExercise.answers.length) {
        return;
      }

      const selectedAnswer = selectedExercise.answers[pressedKey - 1];
      console.log('Running check...')
      checkAnswer(selectedAnswer);

    }

    window.addEventListener('keydown', handleKeydown);

    return () => {
      window.removeEventListener('keydown', handleKeydown);
    }
  });


	function handleGameResult(exercises: Exercise[]): void {
		console.log('Handling game result!', exercises);
		// Send to server here.
	}

	async function handleFakeGameResults(): Promise<void> {
		const mock = mockData;
		const requestData: GameResult[] = mock.map(exercise => {
			return {
				characterId: exercise.character.id,
				questionType: exercise.questionType as Question$options,
				correct: exercise.correct
			};
		});

		const mutationResults = await submitGameResults.mutate({ gameResults: requestData });
    console.log('Mutation results:', mutationResults);
	}

	function selectNewExercise(exercises: Exercise[]): void {
		const newExercise = exercises.find(exercise => exercise.correct === false);
		if (newExercise) {
			selectedExercise = newExercise;
		} else {
			handleGameResult(seenExercises);
		}
	}

	function checkAnswer(answer: Answer): void {
		if (!selectedExercise) {
			return;
		}

    console.log('Evaluating answer:', answer)

		const selectedCopy = {
      ...selectedExercise,
      answers: [ ...selectedExercise.answers ]
     };

		if (answer.correct) {
			selectedCopy.correct = true;
			selectedExercise.correct = true;
			selectNewExercise(exercises);
		} else {
      selectedCopy.correct = false;
      selectedExercise.correct = false;
      exercises.shift();
			exercises = [...exercises, selectedCopy];
		}
		seenExercises = [...seenExercises, selectedCopy];
	}
</script>

<button on:click={handleFakeGameResults}>Handle fake game results</button>

{#if selectedExerciseIndex}
	<h5>Exercise {selectedExerciseIndex} of {exercises.length}</h5>
	{#if selectedExercise.questionType.startsWith('TRANS_TO_CUN')}
		<h2>{selectedExercise.character.syllValues?.join(', ')}</h2>
		<h3>Select the corresponding cuneiform sign</h3>
		<ul class="answers">
			{#each selectedExercise.answers as answer}
				<li>
					<button type="button" class="cuneiform" on:click={() => checkAnswer(answer)}
						>{renderUnicode(answer.displayValue)}</button
					>
				</li>
			{/each}
		</ul>
	{:else}
		<h2 class="cuneiform">{renderUnicode(selectedExercise.character.unicode)}</h2>
		<h3>Select the corresponding transliteration</h3>
		<ul class="answers">
			{#each selectedExercise.answers as answer}
				<li>
					<button type="button" on:click={() => checkAnswer(answer)}>{answer.displayValue}</button>
				</li>
			{/each}
		</ul>
	{/if}
{:else}
	<p>There are no more exercises to do.</p>
{/if}

{#if gameState === GameState.FINISHED}
	<p>Game over!</p>

	<p>Score: {exercises.filter((exercise) => exercise.correct).length}/{exercises.length}</p>
	<p>Mistakes:</p>
	<ul>
		{#each exercises.filter((exercise) => !exercise.correct) as exercise}
			<li>{exercise.character.id} - {exercise.questionType}</li>
		{/each}
	</ul>

	<!-- <button type="button" on:click={startGame}>Restart</button> -->
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
