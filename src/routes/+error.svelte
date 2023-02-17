<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="flex flex-col items-center justify-center">
	<h1 class="text-9xl">{$page.status}</h1>
	<p class="text-2xl">{$page.error?.message}</p>
</div>
