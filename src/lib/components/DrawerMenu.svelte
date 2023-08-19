<script lang="ts">
	import { goto } from "$app/navigation";
	import { page } from "$app/stores";
	import { Content } from "@smui/card";
	import Drawer from "@smui/drawer";
	import List, { Item, Separator, Subheader, Graphic, Text } from "@smui/list";
	import { createEventDispatcher } from "svelte";

	export let menuOpen = false;

	let form: HTMLFormElement;

	const dispatch = createEventDispatcher<never>();

	function navigateTo(path: string): void {
		dispatch('toggleMenu');
		goto(path);
	}

</script>
<div class="drawer-container">
	<Drawer variant="modal" open={menuOpen}>
		<Content>
			<List on:click={() => dispatch('toggleMenu')}>
				<Item on:SMUI:action={() => navigateTo('/')}>
					<Graphic class="material-icons">home</Graphic>
					<Text>Home</Text>
				</Item>
				<Item on:SMUI:action={() => navigateTo('/about')}>
					<Graphic class="material-icons">info</Graphic>
					<Text>About</Text>
				</Item>

				<Item on:SMUI:action={() => navigateTo('/characters')}>
					<Graphic>
						<span class="cuneiform">𒀭</span>
					</Graphic>
					<Text>Characters</Text>
				</Item>

				<Item on:SMUI:action={() => navigateTo('/transliterator')}>
					<Graphic class="material-icons">translate</Graphic>
					<Text>Transliterator</Text>
				</Item>

				<Item on:SMUI:action={() => navigateTo('/components')}>
					<Graphic class="material-icons">donut_small</Graphic>
					<Text>Components</Text>
				</Item>

				<Separator />

				<Subheader tag="h6">Authentication</Subheader>
				{#if !$page.data.user}
				<Item on:SMUI:action={() => navigateTo('register')}>
					<Graphic class="material-icons">person_add</Graphic>
					<Text>Register</Text>
				</Item>
				<Item on:SMUI:action={() => navigateTo('login')}>
					<Graphic class="material-icons">account_circle</Graphic>
					<Text>Log in</Text>
				</Item>
				{:else}
				<form bind:this={form} action="/logout" method="POST">
					<Item on:SMUI:action={() => form.submit()}>
						<Graphic class="material-icons">logout</Graphic>
						<Text>Log out</Text>
					</Item>
				</form>
				{/if}
			</List>
			</Content>
	</Drawer>
</div>