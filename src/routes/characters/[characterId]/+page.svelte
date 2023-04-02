<script lang="ts">
	import { SignVariantCategory } from "$houdini";
	import { fontsetMapping, renderUnicode } from "$lib/utils";
  import type { PageData } from './$houdini';
  export let data: PageData;

  $: ({characters_char} = data)
  $: character = $characters_char.data?.char;
  $: defaultVariant = character?.variants?.find(variant => variant.category === SignVariantCategory.DEFAULT);
  $: altVariants = character?.variants?.filter(variant => variant.category !== SignVariantCategory.DEFAULT);

</script>

{#if $characters_char.fetching}
  <p>Loading...</p>
{:else if character}
<nav>
  <button><a href='./{parseInt(character.id) - 1}'>Previous</a></button>
  <h3>Character no. {character.id}</h3>
  <button><a href='./{parseInt(character.id) + 1}'>Next</a></button>
</nav>
<article>
  <section class="component-gallery">
    <h1 class="gallery cuneiform">{renderUnicode(character.unicode)}</h1>

    {#if defaultVariant}
    <aside class="component-container">
      <h4 class="component-title">Sign components</h4>
      <ul>
        <li>Vertical: {defaultVariant.vertical}</li>
        <li>Horizontal: {defaultVariant.horizontal}</li>
        <li>Glossenkeil: {defaultVariant.glossenkeil}</li>
        <li>Ascending: {defaultVariant.diagonalAsc}</li>
        <li>Descending: {defaultVariant.diagonalDesc}</li>
      </ul>
    </aside>
    {/if}
  </section>

  {#if altVariants && altVariants.length > 0}
  <section class="alternative">
    <h4>Alternative forms:</h4>
    <ul>
    {#each altVariants as variant}
      <li class="{fontsetMapping[variant.fontSet]}">{renderUnicode(character.unicode)}</li>
          {/each}
    </ul>
  </section>
  {/if}

  {#if character.syllValues && character.syllValues.length > 0}
  <section class="syllabograph">
    <h4>Syllabographic values:</h4>
    <ul>
      {#each character.syllValues as syllabogram}
      <li><i>{syllabogram}</i></li>
      {/each}
    </ul>
  </section>
  {/if}

  {#if character.logValues && character.logValues.length > 0}
  <section class="logograph">
    <h4>Logographic values:</h4>
    <ul>
      {#each character.logValues as logogram}
      <li><i>{logogram.logTransliteration}</i> -- {logogram.logTranslation}</li>
      {/each}
    </ul>
  </section>
  {/if}

  {#if character.detValues && character.detValues.length > 0}
  <section class="determiner">
    <h4>Determiner values:</h4>
    <ul>
      {#each character.detValues as determiner}
      <li><i>{determiner.detTransliteration}</i> -- {determiner.detTranslation}</li>
      {/each}
    </ul>
  </section>
  {/if}
  </article>
{/if}

<style lang="scss">
  .component-gallery {
    display: flex;
    align-items: center;

    .gallery {
      font-size: 5rem;
      padding: 0 .5em;
    }

    ul {
      list-style: none;
      padding: 0;
    }
  }

  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>