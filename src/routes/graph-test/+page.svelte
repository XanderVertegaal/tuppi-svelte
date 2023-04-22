<script lang="ts">
	import { get } from 'svelte/store';
  import type { PageData } from './$houdini';
  export let data: PageData;

  $: ({test_exercise} = data);

  $: console.log($test_exercise.data);

</script>
