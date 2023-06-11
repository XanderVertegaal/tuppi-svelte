<script lang="ts">
	import { renderUnicode } from '$lib/utils';
	import { onMount } from 'svelte';
	import { mockGameResults } from './mockData.js';
	import { GameState, type Question } from '$lib/types.js';

	interface GameResult {
		correct: boolean;
		characterId: string;
		questionType: Question;
	};

	export let data;
	export let exercises = data.exercises;

	let selectedExercise: Exercise | null = null;
	let gameResults: GameResult[] = [];

	const submitGameResults = new SubmitGameResultStore();

	let gameState: GameState = GameState.RUNNING;

	$: totalGameResults = gameResults.length;

	$: if (exercises) {
		selectedExercise = exercises.shift() ?? null;
		if (!selectedExercise && gameResults.length > 0) {
			gameState = GameState.FINISHED;
			handleGameResult(gameResults);
		}
	}

  onMount(() => {
    function handleKeydown(event: KeyboardEvent): void {
      if (!selectedExercise) {
        return;
      }

      const pressedKey = parseInt(event.key)
      if (isNaN(pressedKey) || pressedKey > selectedExercise.answers.length) {
        return;
      }

      const selectedAnswer = selectedExercise.answers[pressedKey - 1];
      checkAnswer(selectedAnswer);
    }

    window.addEventListener('keydown', handleKeydown);

    return () => {
      window.removeEventListener('keydown', handleKeydown);
    }
  });


	async function handleGameResult(results: GameResult[]): Promise<void> {
		console.log('Handling game result!', results);
		// Send to server here.

		submitGameResults.mutate({
			gameResults: results
		}).then(mutationResult => {
			console.log('Mutation result:', mutationResult);
		}).catch(error => {
			console.error('Mutation error:', error);
		});
	}

	async function handleFakeGameResults(): Promise<void> {
		gameState = GameState.FINISHED;
		gameResults = mockGameResults;
		handleGameResult(mockGameResults);
		selectedExercise = null;
	}

	// Can we use the same function for both buttons and keyboard input? 

	function checkAnswer(answer: Answer): void {
		if (!selectedExercise) {
			return;
		}

		const newGameResult: GameResult = {
			characterId: selectedExercise.character.id,
			questionType: selectedExercise.questionType as Question$options,
			correct: answer.correct
		}

		gameResults = [...gameResults, newGameResult];

		// Move wrong questions to the end of the queue.
		if (answer.correct === false) {
			exercises.push(selectedExercise);
		}

		// Trigger reactivity
		exercises = [...exercises];
	}
</script>

<button on:click={handleFakeGameResults}>Handle fake game results</button>

{#if selectedExercise !== null}
	<h5>Exercise {totalGameResults + 1} of {totalGameResults + exercises.length + 1}</h5>
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
{/if}

{#if gameState === GameState.FINISHED}
	<p>Game over!</p>

	<p>Score: {gameResults.filter(result => result.correct).length}/{gameResults.length}</p>
	<p>Mistakes:</p>
	<ul>
		{#each gameResults.filter(result => !result.correct) as result}
			<li>{result.characterId} - {result.questionType}</li>
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
