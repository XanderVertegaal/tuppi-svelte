<script lang="ts">
	import type { Character } from "$lib/charMap";
	import { renderUnicode } from "$lib/utils";
	import { createEventDispatcher } from "svelte";

  export let character: Character;
  export let selected: boolean;

  const dispatch = createEventDispatcher<{select: {id: number}}>();

  function selectCharacter() {
    dispatch("select", {id: character.id});
  }

</script>

<li class="char-card" class:selected>
  <span class="char-id">#{character.id}</span>
  <h2 class="char cuneiform">{renderUnicode(character.cuneiform.unicode)}</h2>

  <button type="button" on:click={selectCharacter}>{selected ? 'Selected' : 'Select'}</button>

  <button type="button">
    <a href="/card-details/{character.id}">More info</a>
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