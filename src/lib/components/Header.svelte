<script lang="ts">
	import TopAppBar, { Row, Section, Title } from '@smui/top-app-bar';
	import FormField from '@smui/form-field';
	import { darkThemeStore } from '$lib/stores/darkThemeStore';
	import Button from '@smui/button';
	import { createEventDispatcher } from 'svelte';
	import IconButton from '@smui/icon-button';
	
	function toggleDarkTheme(): void {
		darkThemeStore.update((value) => !value);
	}

	const dispatch = createEventDispatcher<never>();
	
	function toggleMenu(): void {
		dispatch('toggleMenu');
	}

</script>

<TopAppBar variant='static' dense={true} color='primary'>
	<Row>
		<Section align="start" role="banner">
			<Button type="button" on:click={toggleMenu}>Menu</Button>
			<Title><span class="cuneiform">𒀭 </span> Tuppi</Title>
		</Section>
		<Section align="end" toolbar>
			<FormField on:click={toggleDarkTheme}>
				<IconButton class="material-icons">{$darkThemeStore ? 'light_mode' : 'dark_mode'}</IconButton>
			</FormField>
		</Section>

	</Row>
</TopAppBar>
