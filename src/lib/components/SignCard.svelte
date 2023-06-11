<script lang="ts">
	import { fontsetMapping, renderUnicode } from '$lib/utils';
	import { FontSet } from '@prisma/client';
	import { createEventDispatcher } from 'svelte';

	export let character: any;
	export let enableSelect: boolean = true;
	export let selected: boolean = false;
	export let fontSet: FontSet = FontSet.ULLIKUMMI_A;

	const dispatch = createEventDispatcher<{ select: { id: number } }>();

	function selectCharacter() {
		dispatch('select', { id: character.id });
	}
</script>

<li class="char-card" class:selected>
	<span class="char-id">#{character.id}</span>
	<h2 class="char {fontsetMapping[fontSet]}">{renderUnicode(character.unicode)}</h2>

	{#if enableSelect}
		<button type="button" on:click={selectCharacter}>{selected ? 'Selected' : 'Select'}</button>
	{/if}

	<button type="button">
		<a href="/characters/{character.id}">More info</a>
	</button>
</li>

<style lang="scss">
	.char-card {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100px;
		height: 150px;
		border-radius: 10px;
		background-color: #f0f0f0;

		&.selected {
			background-color: #979797;
		}

		.char-id {
			position: absolute;
			bottom: 5px;
			right: 5px;
			color: #777;
		}

		.char {
			font-size: 1.5em;
			text-align: center;
		}

		button {
			&:not(:last-child) {
				margin-bottom: 5px;
			}

			a {
				text-decoration: none;
				color: black;
			}
		}
	}
</style>
