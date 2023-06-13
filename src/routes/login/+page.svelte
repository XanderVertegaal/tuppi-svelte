<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<h1>Login</h1>

<form action="?/login" method="POST" use:enhance>
	<section>
		<label for="username">Username</label>
		<input type="text" name="username" id="username" autocomplete="username" required />
	</section>

	<section>
		<label for="password">Password</label>
		<input type="password" name="password" id="password" autocomplete="current-password" required />
	</section>

	{#if form?.invalid}
		<p class="error">Invalid input.</p>
	{/if}

	{#if form?.credentials}
		<p class="error">Incorrect username or password.</p>
	{/if}

	<button type="submit">Log in</button>
</form>
