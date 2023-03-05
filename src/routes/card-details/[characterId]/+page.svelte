<script lang="ts">
	import { SignVariantCategory } from "$lib/types";
	import { renderUnicode } from "$lib/utils";
  import { onMount } from "svelte";
  import type { PageData } from "./$types";
  export let data: PageData;

  const defaultChar = data.character?.cuneiform.variants.find(variant => variant.category === SignVariantCategory.DEFAULT) ?? null;
  const alternativeChars = data.character?.cuneiform.variants.filter(variant => variant.category !== SignVariantCategory.DEFAULT) ?? [];

  onMount(() => {
    console.log(data);
  });

</script>
<nav>
  <button><a href='./{parseInt(data.characterId) - 1}'>Previous</a></button>
  <h3>Character no. {data.characterId}</h3>
  <button><a href='./{parseInt(data.characterId) + 1}'>Next</a></button>
</nav>

{#if data.character}
  <article>
    <section class="component-gallery">
      <h1 class="gallery cuneiform">{renderUnicode(data.character.cuneiform.unicode)}</h1>
  
      {#if defaultChar}
      <aside class="component-container">
        <h4 class="component-title">Sign components</h4>
        <ul>
          <li>Vertical: {defaultChar.components.vertical}</li>
          <li>Horizontal: {defaultChar.components.horizontal}</li>
          <li>Glossenkeil: {defaultChar.components.glossenkeil}</li>
          <li>Ascending: {defaultChar.components.diagonalAsc}</li>
          <li>Descending: {defaultChar.components.diagonalDesc}</li>
        </ul>
      </aside>
      {/if}
    </section>

    {#if alternativeChars.length > 0}
    <section class="alternative">
      <h4>Alternative forms:</h4>
      <ul>
        {#each alternativeChars as variant}
        <li style:font-family="{variant.fontset}">{renderUnicode(data.character.cuneiform.unicode)}</li>
        {/each}
      </ul>
    </section>
    {/if}

    {#if data.character.syllabograph.length > 0}
    <section class="syllabograph">
      <h4>Syllabographic values:</h4>
      <ul>
        {#each data.character.syllabograph as syllabogram}
          <li><i>{syllabogram}</i></li>
        {/each}
      </ul>
    </section>
    {/if}

    {#if data.character.logograph.length > 0}
    <section class="logograph">
      <h4>Logographic values:</h4>
      <ul>
        {#each data.character.logograph as logogram}
          <li><i>{logogram.logTransliteration}</i> -- {logogram.logTranslation}</li>
        {/each}
      </ul>
    </section>
    {/if}

    {#if data.character.determiner.length > 0}
    <section class="determiner">
      <h4>Determiner values:</h4>
      <ul>
        {#each data.character.determiner as determiner}
          <li><i>{determiner.detTransliteration}</i> -- {determiner.detTranslation}</li>
        {/each}
      </ul>
    </section>
    {/if}
  </article>
{:else if data.error !== null}
  <h3>An error occured: {data.error}</h3>
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