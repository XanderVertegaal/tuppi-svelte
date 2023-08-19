<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '@smui/button';
	import type { ActionData } from './$types';
	import Textfield from '@smui/textfield';

	export let form: ActionData;

	let username = '';
	let password = '';
</script>

<h6>Login</h6>

<form action="?/login" method="POST" use:enhance>
	<Textfield
		variant="standard"
		input$autocomplete="username"
		input$name="username"
		label="Username" 
		bind:value={username} 
		required />

		<Textfield
			class="form-field"
			variant="standard"
			input$name="password"
			input$autocomplete="current-password" 
			type="password"
			bind:value={password} 
			label="Password" 
			required />

	{#if form?.invalid}
		<p class="error">Invalid input.</p>
	{/if}

	{#if form?.credentials}
		<p class="error">Incorrect username or password.</p>
	{/if}

	<Button variant="raised" type="submit">Log in</Button>
</form>

<style lang="scss">
	form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
</style>
