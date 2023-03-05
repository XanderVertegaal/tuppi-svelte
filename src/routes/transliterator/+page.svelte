<script lang="ts">
  import { CHARMAP } from '../../lib/charMap';

  let latin = '';
  let cuneiform = '';

  function changeLatin(event: Event) {
    let newValue = (event.target as HTMLInputElement).value;

    newValue = newValue.toLowerCase()
      .replaceAll('h', 'ḫ')
      .replaceAll('s', 'š')
      .replaceAll('ua', 'u̯a')
      .replaceAll('ui', 'u̯i')
      .replaceAll('uu', 'u̯u')
      .replaceAll('ia', 'i̯a');
    
    latin = newValue;

    const newCuneiform = newValue
    .split('-')
    .map(syll => {
      if (syll === '' || syll === ' ') {
        return '';
      }
      return CHARMAP[syll as keyof typeof CHARMAP] ?? '';
    })
      .join('');
    
    cuneiform = newCuneiform;
  }

  function changeCuneiform(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = target.value;
  }

</script>

<h3>Transliteration tool</h3>

<p>Convert Roman transliterations to cuneiform and vice versa.</p>

<form>
  <label for="latin">
    Latin:
    <input type="text" id="latin" class="latin" bind:value={latin} on:input={changeLatin} />
  </label>
  <label for="cuneiform">
    Cuneiform:
    <input type="text" id="cuneiform" class="cuneiform" bind:value={cuneiform} on:input={changeCuneiform}/>
  </label>
</form>

<style lang="scss">
  form {
    max-width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1em;
    padding: 1em;

    .latin, .cuneiform {
      font-size: 1.5em;
      width: 100%;
    }
  }
</style>