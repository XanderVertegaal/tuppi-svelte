<script lang="ts">
	import { darkThemeStore } from '$lib/stores/darkThemeStore';
	import { onMount } from 'svelte';
	import Footer from '../lib/components/Footer.svelte';
	import Header from '../lib/components/Header.svelte';
	import DrawerMenu from '$lib/components/DrawerMenu.svelte';
	
	onMount(() => {
		darkThemeStore.set(window.matchMedia('(prefers-color-scheme: dark)').matches);
	})

	let menuOpen = false;
	
	function toggleMenu(): void {
		menuOpen = !menuOpen;
	}
</script>

<svelte:head>
	{#if $darkThemeStore === undefined}
	<link rel="stylesheet" href="/smui.css" media="(prefers-color-scheme: light)" />
	<link rel="stylesheet" href="/smui-dark.css" media="screen and (prefers-color-scheme: dark)" />
	{:else if $darkThemeStore === true}
	<link rel="stylesheet" href="/smui.css" />
	<link rel="stylesheet" href="/smui-dark.css" media="screen" />
	{:else}
	<link rel="stylesheet" href="/smui.css" />
	{/if}
</svelte:head>

<Header on:toggleMenu={toggleMenu} />
<DrawerMenu menuOpen={menuOpen} on:toggleMenu={toggleMenu} />

<main>
	<slot />
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

	* :global(a) {
		color: var(--theme-primary);
		text-decoration: none;
	}
</style>
