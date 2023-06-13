<script lang="ts">
  import { page } from '$app/stores';
</script>

{#if $page.data.user}
  <h2>Hi {$page.data.user.username}</h2>
{:else}
  <h2>Hi Guest</h2>
{/if}

<h3>Welcome to Tuppi!</h3>

<h5>Current progress: 0 / 31 signs</h5>
