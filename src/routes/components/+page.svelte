<script lang="ts">
	import { browser } from "$app/environment";
	import type { CompVariants$result } from "$houdini";
	import type { SignComponents } from "$lib/types";
	import { renderUnicode } from "$lib/utils";
  import type { PageData } from './$houdini';
  export let data: PageData;

  interface BaseCharacter {
    fontSet: string;
    unicode: string;
  }

  $: ({CompVariants} = data);
  $: baseCharacters = getBaseCharacters($CompVariants.data?.compVariants.identicalVariants ?? []);
  $: similarCharacters = $CompVariants.data?.compVariants.similarVariants ?? [];



  function getBaseCharacters(identicalVariants: CompVariants$result['compVariants']['identicalVariants']): BaseCharacter[] {
   const baseCharacters: BaseCharacter[] = [];
    identicalVariants.forEach(variant => {
      const category = variant.category;
      const categoryVariant = variant.character.variants?.find(variant => variant.category === category);
      if (categoryVariant) {
        baseCharacters.push({
          fontSet: categoryVariant.fontSet,
          unicode: variant.character.unicode
        });
      }
    });
    return baseCharacters; 
  }

  $: browser && CompVariants.fetch({variables: {input: form}});

  const form: SignComponents = {
    horizontal: 0,
    vertical: 0,
    glossenkeil: 0,
    diagonalAsc: 0,
    diagonalDesc: 0
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

        <!-- Implement getFontClass util + delete old ones-->
          <li><h1 class="{'cuneiform'}">{renderUnicode(baseChar.unicode)}</h1></li>
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
        <!-- {#each data.similarCharacters.verticalMinus as variant}
          <span class="{getFontClassForVariant(variant)}">{renderUnicode(variant.fullCharacter.cuneiform.unicode)}</span>
        {/each} -->
      </td>
      <td><button on:click="{() => form['vertical']--}">-</button></td>
      <td>Vertical: {form.vertical}</td>
      <td><button on:click="{() => form['vertical']++}">+</button></td>
      <td>
        <!-- {#each data.similarCharacters.verticalPlus as variant}
          <span class="{getFontClassForVariant(variant)}">{renderUnicode(variant.fullCharacter.cuneiform.unicode)}</span>
        {/each} -->
      </td>
    </tr>
    <tr>
      <td>
        <!-- {#each data.similarCharacters.horizontalMinus as variant}
          <span class="{getFontClassForVariant(variant)}">{renderUnicode(variant.fullCharacter.cuneiform.unicode)}</span>
        {/each} -->
      <td><button on:click={() => form['horizontal']--}>-</button></td>
      <td>Horizontal: {form.horizontal}</td>
      <td><button on:click={() => form['horizontal']++}>+</button></td>
      <td>
        <!-- {#each data.similarCharacters.horizontalPlus as variant}
          <span class="{getFontClassForVariant(variant)}">{renderUnicode(variant.fullCharacter.cuneiform.unicode)}</span>
        {/each} -->
    </tr>
    <tr>
      <td>
        <!-- {#each data.similarCharacters.glossenkeilMinus as variant}
          <span class="{getFontClassForVariant(variant)}">{renderUnicode(variant.fullCharacter.cuneiform.unicode)}</span>
        {/each} -->
      <td><button on:click={() => form['glossenkeil']--}>-</button></td>
      <td>Glossenkeil: {form.glossenkeil}</td>
      <td><button on:click={() => form['glossenkeil']++}>+</button></td>
      <td>
        <!-- {#each data.similarCharacters.glossenkeilPlus as variant}
          <span class="{getFontClassForVariant(variant)}">{renderUnicode(variant.fullCharacter.cuneiform.unicode)}</span>
        {/each} -->
    </tr>
    <tr>
      <td>
        <!-- {#each data.similarCharacters.diagonalAscMinus as variant}
          <span class="{getFontClassForVariant(variant)}">{renderUnicode(variant.fullCharacter.cuneiform.unicode)}</span>
        {/each} -->
      <td><button on:click={() => form['diagonalAsc']--}>-</button></td>
      <td>Ascending: {form.diagonalAsc}</td>
      <td><button on:click={() => form['diagonalAsc']++}>+</button></td>
      <td>
        <!-- {#each data.similarCharacters.diagonalAscPlus as variant}
          <span class="{getFontClassForVariant(variant)}">{renderUnicode(variant.fullCharacter.cuneiform.unicode)}</span>
        {/each} -->
    </tr>
    <tr>
      <td>
        <!-- {#each data.similarCharacters.diagonalDescMinus as variant}
          <span class="{getFontClassForVariant(variant)}">{renderUnicode(variant.fullCharacter.cuneiform.unicode)}</span>
        {/each} -->
      <td><button on:click={() => form['diagonalDesc']--}>-</button></td>
      <td>Descending: {form.diagonalDesc}</td>
      <td><button on:click={() => form['diagonalDesc']++}>+</button></td>
      <td>
        <!-- {#each data.similarCharacters.diagonalDescPlus as variant}
          <span class="{getFontClassForVariant(variant)}">{renderUnicode(variant.fullCharacter.cuneiform.unicode)}</span>
        {/each} -->
    </tr>
  </tbody>
</table>

<!-- {#if data.character && baseCharacter}
  
  {#if data.similarCharacters}
  <table>
    <tbody>
      <tr>
        <td>
          {#each data.similarCharacters.verticalMinus as variant}
            <span class="{getFontClassForVariant(variant)}">{renderUnicode(variant.fullCharacter.cuneiform.unicode)}</span>
          {/each}
        </td>
        <td><button on:click="{() => form['vertical']--}">-</button></td>
        <td>Vertical: {form.vertical}</td>
        <td><button on:click="{() => form['vertical']++}">+</button></td>
        <td>
          {#each data.similarCharacters.verticalPlus as variant}
            <span class="{getFontClassForVariant(variant)}">{renderUnicode(variant.fullCharacter.cuneiform.unicode)}</span>
          {/each}
        </td>
      </tr>
      <tr>
        <td>
          {#each data.similarCharacters.horizontalMinus as variant}
            <span class="{getFontClassForVariant(variant)}">{renderUnicode(variant.fullCharacter.cuneiform.unicode)}</span>
          {/each}
        <td><button on:click={() => form['horizontal']--}>-</button></td>
        <td>Horizontal: {form.horizontal}</td>
        <td><button on:click={() => form['horizontal']++}>+</button></td>
        <td>
          {#each data.similarCharacters.horizontalPlus as variant}
            <span class="{getFontClassForVariant(variant)}">{renderUnicode(variant.fullCharacter.cuneiform.unicode)}</span>
          {/each}
      </tr>
      <tr>
        <td>
          {#each data.similarCharacters.glossenkeilMinus as variant}
            <span class="{getFontClassForVariant(variant)}">{renderUnicode(variant.fullCharacter.cuneiform.unicode)}</span>
          {/each}
        <td><button on:click={() => form['glossenkeil']--}>-</button></td>
        <td>Glossenkeil: {form.glossenkeil}</td>
        <td><button on:click={() => form['glossenkeil']++}>+</button></td>
        <td>
          {#each data.similarCharacters.glossenkeilPlus as variant}
            <span class="{getFontClassForVariant(variant)}">{renderUnicode(variant.fullCharacter.cuneiform.unicode)}</span>
          {/each}
      </tr>
      <tr>
        <td>
          {#each data.similarCharacters.diagonalAscMinus as variant}
            <span class="{getFontClassForVariant(variant)}">{renderUnicode(variant.fullCharacter.cuneiform.unicode)}</span>
          {/each}
        <td><button on:click={() => form['diagonalAsc']--}>-</button></td>
        <td>Ascending: {form.diagonalAsc}</td>
        <td><button on:click={() => form['diagonalAsc']++}>+</button></td>
        <td>
          {#each data.similarCharacters.diagonalAscPlus as variant}
            <span class="{getFontClassForVariant(variant)}">{renderUnicode(variant.fullCharacter.cuneiform.unicode)}</span>
          {/each}
      </tr>
      <tr>
        <td>
          {#each data.similarCharacters.diagonalDescMinus as variant}
            <span class="{getFontClassForVariant(variant)}">{renderUnicode(variant.fullCharacter.cuneiform.unicode)}</span>
          {/each}
        <td><button on:click={() => form['diagonalDesc']--}>-</button></td>
        <td>Descending: {form.diagonalDesc}</td>
        <td><button on:click={() => form['diagonalDesc']++}>+</button></td>
        <td>
          {#each data.similarCharacters.diagonalDescPlus as variant}
            <span class="{getFontClassForVariant(variant)}">{renderUnicode(variant.fullCharacter.cuneiform.unicode)}</span>
          {/each}
      </tr>
    </tbody>
  </table>
  {/if}
</article>
{/if} -->


<style lang="scss">
  .gallery h1 {
    font-size: 5rem;
    margin: 20px 0;
    text-align: center;
  }
</style>