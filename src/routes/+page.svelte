<script lang="ts">
  import { page } from '$app/stores';
	import Button from '@smui/button';
	import type { PageServerData } from './$types';

  export let data: PageServerData;

  $: ({ signProgresses, loggedIn, username } = data);

  let numberOfUnlocks = 0;

  $: if (signProgresses) {
    numberOfUnlocks = signProgresses.length;
  }

</script>

{#if loggedIn}
  <h6>Hi {username}</h6>
  <big>Welcome to Tuppi!</big>
  <div>
    <strong>You have unlocked {numberOfUnlocks} signs</strong>
  </div>
{:else}
  <h6>Hi Guest</h6>
  <big>Welcome to Tuppi!</big>
  <p>You are not logged in and will not be able to save your progress. Click the register button at the top of the page to create a user account.</p>
{/if}

<Button href="/characters">Start learning</Button>