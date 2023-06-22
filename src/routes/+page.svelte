<script lang="ts">
  import { page } from '$app/stores';
	import type { PageServerData } from './$types';

  export let data: PageServerData;

  $: ({ signProgresses, loggedIn, username } = data);

  let numberOfUnlocks = 0;

  $: if (signProgresses) {
    numberOfUnlocks = signProgresses.length;
  }

</script>

{#if loggedIn}
  <h2>Hi {username}</h2>
  <h3>Welcome to Tuppi!</h3>
  <h4>You have unlocked {numberOfUnlocks} signs</h4>
{:else}
  <h2>Hi Guest</h2>
  <h3>Welcome to Tuppi!</h3>
  <h4>You are not logged in and will not be able to save your progress. Click the register button at the top of the page to create a user account.</h4>
{/if}