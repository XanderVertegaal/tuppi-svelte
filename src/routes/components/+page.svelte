<script lang="ts">
	import { browser } from "$app/environment";
	import type { SignComponents } from "$lib/types";
	import { getFontClass, getFontClassForVariant, getSignVariantCategory as getVariant, renderUnicode } from "$lib/utils";
	import type { PageData } from "./$types";
  export let data: PageData;


  $: baseCharacter = getVariant(data.character, data.signType);
  $: fontClass = getFontClass(baseCharacter);
  $: if (form) {
    postForm(form);
  }

  const form: SignComponents = {
    horizontal: baseCharacter?.components.horizontal ?? 0,
    vertical: baseCharacter?.components.vertical ?? 0,
    glossenkeil: baseCharacter?.components.glossenkeil ?? 0,
    diagonalAsc: baseCharacter?.components.diagonalAsc ?? 0,
    diagonalDesc: baseCharacter?.components.diagonalDesc ?? 0
  }

  async function postForm(form: SignComponents): Promise<void> {
    if (browser) {
      const data = await fetch('api/similar-characters', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      });
  
      const json = await data.json();
      console.log('Server response:', json);
    };
  }

</script>

{#if data.character && baseCharacter}
<article>
  <section class="gallery">
    <h1 class="{fontClass}">{renderUnicode(data.character.cuneiform.unicode)}</h1>
  </section>
  
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
{/if}


<style lang="scss">
  .gallery h1 {
    font-size: 5rem;
    margin: 20px 0;
    text-align: center;
  }
</style>