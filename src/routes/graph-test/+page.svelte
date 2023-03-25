<script lang="ts">
	import { get } from 'svelte/store';
  import type { PageData } from './$houdini';
  export let data: PageData;

  $: ({ User } = data)

  $: console.log(get(User).data?.user?.lastName)
</script>

<p>Hi, my name is {$User.data?.user?.firstName}.</p>