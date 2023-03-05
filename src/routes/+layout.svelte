<script lang="ts">
	import Footer from "../lib/components/Footer.svelte";
  import Header from "../lib/components/Header.svelte";
</script>

<Header />
<main>
  <slot></slot>
</main>
<Footer />

<style>
  @font-face {
    font-family: 'ullikummia';
    src: 'url(./fonts/ullikummia.ttf)';
  }

  @font-face {
    font-family: 'ullikummib';
    src: 'url(./fonts/ullikummib.ttf)';
  }

  @font-face {
    font-family: 'ullikummic';
    src: 'url(./fonts/ullikummic.ttf)';
  }

  :global(body) {
    margin: 0;
    box-sizing: border-box;
    position: relative;
    min-height: 100vh;
  }  

  :global(.cuneiform, .cuneiform-a) {
    font-family: 'ullikummia';
  }

  :global(.cuneiform-b) {
    font-family: 'ullikummib';
  }

  :global(.cuneiform-c) {
    font-family: 'ullikummic';
  }

  main {
    padding: 1rem;
    padding-bottom: 100px; /* Footer height + some extra */
  }
</style>