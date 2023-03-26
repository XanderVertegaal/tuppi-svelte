<script lang="ts">
  let menuOpen = false;

  const toggleMenu = () => {
    menuOpen = !menuOpen;
  };
</script>

<header>
  <section class="title">
    <h1 class="cuneiform">𒀭</h1>
    <h1>Tuppi</h1>
  </section>
  <nav class="main">
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/about">About</a></li>
      <li><a href="/characters">Characters</a></li>
      <li><button on:click={toggleMenu}>Utilities</button></li>
    </ul>  
  </nav>

  {#if menuOpen}
  <nav class="sub">
    <ul>
      <li><a href="/transliterator">Transliterator</a></li>
      <li><a href="/components">Components</a></li>
    </ul>
  </nav>
  {/if}
</header>

<style lang="scss">
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background: #f0f0f0;

    @media screen and (max-width: 600px) {
      flex-direction: column;
    }

    .title {
      display: flex;
      column-gap: 1em;
    }
  
    nav {
      ul {
        display: flex;
        list-style: none;
        margin: 0;
        padding: 0;
  
        li {
          margin-left: 1rem;
        }
      }
    }
  }
</style>