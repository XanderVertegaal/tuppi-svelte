<script lang="ts">
	import { browser } from '$app/environment';
	import type {
		characters_char,
		characters_char$result,
		CompVariants$result,
		FontSet$options
	} from '$houdini';
	import SignCard from '$lib/components/SignCard.svelte';
	import type { SignCardCharacter, SignComponents } from '$lib/types';
	import { fontsetMapping, getTypedKeys, renderUnicode } from '$lib/utils';
	import type { PageData } from './$houdini';

	export let data: PageData;

	interface BaseCharacter {
		fontSet: FontSet$options;
		character: SignCardCharacter;
	}

	type SimilarCharacters = CompVariants$result['compVariants']['similarVariants'];
	type DisplaySimilarVariants = { [key in keyof SimilarCharacters]: BaseCharacter[] };

	const form: SignComponents = {
		horizontal: 0,
		vertical: 0,
		glossenkeil: 0,
		diagonalAsc: 0,
		diagonalDesc: 0
	};

	$: ({ CompVariants } = data);
	$: baseCharacters = getBaseCharacters($CompVariants.data?.compVariants.identicalVariants ?? []);
	$: similarCharacters = getDisplaySimilarCharacters(
		$CompVariants.data?.compVariants.similarVariants ?? null
	);
	$: form && fetchVariants();

	function fetchVariants(): void {
		if (browser) {
			CompVariants.fetch({
				variables: { input: form },
				policy: 'CacheAndNetwork'
			});
		}
	}

	function getBaseChar(
		compVariant: CompVariants$result['compVariants']['identicalVariants'][0]
	): BaseCharacter | null {
		const category = compVariant.category;
		const categoryVariant = compVariant.character.variants?.find(
			(variant) => variant.category === category
		);
		if (categoryVariant) {
			return {
				fontSet: categoryVariant.fontSet,
				character: {
					id: compVariant.character.id,
					unicode: compVariant.character.unicode
				}
			};
		}
		return null;
	}

	function getBaseCharacters(
		identicalVariants: CompVariants$result['compVariants']['identicalVariants'] | null
	): BaseCharacter[] {
		const baseCharacters: BaseCharacter[] = [];
		if (!identicalVariants) {
			return baseCharacters;
		}
		identicalVariants.forEach((variant) => {
			const baseChar = getBaseChar(variant);
			if (baseChar) {
				baseCharacters.push(baseChar);
			}
		});
		return baseCharacters;
	}

	function getDisplaySimilarCharacters(
		similarCharacters: SimilarCharacters | null
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

{#if $CompVariants.fetching}
	<p>Loading...</p>
{:else}
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
{/if}

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
