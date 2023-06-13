<script lang="ts">
	import SignCard from '$lib/components/SignCard.svelte';
	import type { SignComponents } from '$lib/types';
	import { fontsetMapping, renderUnicode } from '$lib/utils';
	import type { PageServerData } from './$types';
	import type { ComparableVariant, SimilarVariants } from '$lib/findSimilarCharacters';
	import type { FontSet } from '@prisma/client';
	import { browser } from '$app/environment';

	export let data: PageServerData;

	$: ({ identicalVariants, similarVariants } = data);

	interface BaseCharacter {
		fontSet: FontSet;
		character: {
			id: number;
			unicode: string;
		};
	}

	type DisplaySimilarVariants = {
		[key in keyof SimilarVariants]: BaseCharacter[];
	};

	const form: SignComponents = {
		horizontal: 0,
		vertical: 0,
		glossenkeil: 0,
		diagonalAsc: 0,
		diagonalDesc: 0
	};

	// Base characters are shown at the top of the page: they are currently selected.
	$: baseCharacters = getBaseCharacters(identicalVariants ?? []);

	// Similar characters are shown next to the form.
	$: similarCharacters = getDisplaySimilarCharacters(similarVariants ?? null);
	$: form && fetchVariants();

	async function fetchVariants(): Promise<void> {
		if (browser) {
			const response = await fetch('/api/components', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(form)
			});

			if (response.ok) {
				const data = await response.json();
				identicalVariants = data.identicalVariants;
				similarVariants = data.similarVariants;
			} else {
				console.error('Error fetching variants');
			}
		}
	}

	function getBaseCharacters(identicalVariants: ComparableVariant[]): BaseCharacter[] {
		const baseCharacters: BaseCharacter[] = [];
		if (!identicalVariants) {
			return baseCharacters;
		}
		identicalVariants.forEach((variant) => {
			const category = variant.category;
			const categoryVariant = variant.character.variants?.find(
				(variant) => variant.category === category
			);
			if (categoryVariant) {
				baseCharacters.push({
					fontSet: categoryVariant.fontSet,
					character: {
						id: variant.character.id,
						unicode: variant.character.unicode
					}
				});
			}
		});
		return baseCharacters;
	}

	function getDisplaySimilarCharacters(
		similarCharacters: SimilarVariants | null
	): DisplaySimilarVariants {
		if (!similarCharacters) {
			return {
				verticalMinus: [],
				verticalPlus: [],
				horizontalMinus: [],
				horizontalPlus: [],
				glossenkeilMinus: [],
				glossenkeilPlus: [],
				diagonalAscMinus: [],
				diagonalAscPlus: [],
				diagonalDescMinus: [],
				diagonalDescPlus: []
			};
		}
		const displaySimilarVariants: DisplaySimilarVariants = {
			verticalMinus: getBaseCharacters(similarCharacters.verticalMinus),
			verticalPlus: getBaseCharacters(similarCharacters.verticalPlus),
			horizontalMinus: getBaseCharacters(similarCharacters.horizontalMinus),
			horizontalPlus: getBaseCharacters(similarCharacters.horizontalPlus),
			glossenkeilMinus: getBaseCharacters(similarCharacters.glossenkeilMinus),
			glossenkeilPlus: getBaseCharacters(similarCharacters.glossenkeilPlus),
			diagonalAscMinus: getBaseCharacters(similarCharacters.diagonalAscMinus),
			diagonalAscPlus: getBaseCharacters(similarCharacters.diagonalAscPlus),
			diagonalDescMinus: getBaseCharacters(similarCharacters.diagonalDescMinus),
			diagonalDescPlus: getBaseCharacters(similarCharacters.diagonalDescPlus)
		};
		return displaySimilarVariants;
	}
</script>

<article>
	{#if baseCharacters.length > 0}
		<section class="gallery">
			<ul>
				{#each baseCharacters as baseChar}
					<li>
						<SignCard
							fontSet={baseChar.fontSet}
							character={baseChar.character}
							enableSelect={false}
						/>
					</li>
				{/each}
			</ul>
		</section>
	{:else}
		<p>No base characters found</p>
	{/if}
</article>

<table>
	<tbody>
		<tr>
			<td>
				{#each similarCharacters.verticalMinus as variant}
					<span class={fontsetMapping[variant.fontSet]}
						>{renderUnicode(variant.character.unicode)}</span
					>
				{/each}
			</td>
			<td><button on:click={() => form['vertical']--}>-</button></td>
			<td>Vertical: {form.vertical}</td>
			<td><button on:click={() => form['vertical']++}>+</button></td>
			<td>
				{#each similarCharacters.verticalPlus as variant}
					<span class={fontsetMapping[variant.fontSet]}
						>{renderUnicode(variant.character.unicode)}</span
					>
				{/each}
			</td>
		</tr>
		<tr>
			<td>
				{#each similarCharacters.horizontalMinus as variant}
					<span class={fontsetMapping[variant.fontSet]}
						>{renderUnicode(variant.character.unicode)}</span
					>
				{/each}
			</td><td><button on:click={() => form['horizontal']--}>-</button></td>
			<td>Horizontal: {form.horizontal}</td>
			<td><button on:click={() => form['horizontal']++}>+</button></td>
			<td>
				{#each similarCharacters.horizontalPlus as variant}
					<span class={fontsetMapping[variant.fontSet]}
						>{renderUnicode(variant.character.unicode)}</span
					>
				{/each}
			</td></tr
		>
		<tr>
			<td>
				{#each similarCharacters.glossenkeilMinus as variant}
					<span class={fontsetMapping[variant.fontSet]}
						>{renderUnicode(variant.character.unicode)}</span
					>
				{/each}
			</td><td><button on:click={() => form['glossenkeil']--}>-</button></td>
			<td>Glossenkeil: {form.glossenkeil}</td>
			<td><button on:click={() => form['glossenkeil']++}>+</button></td>
			<td>
				{#each similarCharacters.glossenkeilPlus as variant}
					<span class={fontsetMapping[variant.fontSet]}
						>{renderUnicode(variant.character.unicode)}</span
					>
				{/each}
			</td></tr
		>
		<tr>
			<td>
				{#each similarCharacters.diagonalAscMinus as variant}
					<span class={fontsetMapping[variant.fontSet]}
						>{renderUnicode(variant.character.unicode)}</span
					>
				{/each}
			</td><td><button on:click={() => form['diagonalAsc']--}>-</button></td>
			<td>Ascending: {form.diagonalAsc}</td>
			<td><button on:click={() => form['diagonalAsc']++}>+</button></td>
			<td>
				{#each similarCharacters.diagonalAscPlus as variant}
					<span class={fontsetMapping[variant.fontSet]}
						>{renderUnicode(variant.character.unicode)}</span
					>
				{/each}
			</td></tr
		>
		<tr>
			<td>
				{#each similarCharacters.diagonalDescMinus as variant}
					<span class={fontsetMapping[variant.fontSet]}
						>{renderUnicode(variant.character.unicode)}</span
					>
				{/each}
			</td><td><button on:click={() => form['diagonalDesc']--}>-</button></td>
			<td>Descending: {form.diagonalDesc}</td>
			<td><button on:click={() => form['diagonalDesc']++}>+</button></td>
			<td>
				{#each similarCharacters.diagonalDescPlus as variant}
					<span class={fontsetMapping[variant.fontSet]}
						>{renderUnicode(variant.character.unicode)}</span
					>
				{/each}
			</td></tr
		>
	</tbody>
</table>

<style lang="scss">
</style>
