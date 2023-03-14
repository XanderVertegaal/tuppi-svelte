<script lang="ts">
  import type { PageData } from './$houdini';
  export let data: PageData;

  $: ({ User } = data)
</script>

<p>Hi, my name is {$User.data?.user?.firstName}.</p>