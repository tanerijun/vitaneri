<script lang="ts">
	import ThemeToggler from '$lib/components/ThemeToggler.svelte';
</script>

<h1 class="bg-red-500 dark:bg-blue-500">Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
<div class="h-16 w-16 bg-base" />
<div class="mt-3 h-16 w-16 bg-base/70" />
<div class="mt-3 h-16 w-16 bg-highlightLow" />
<div class="mt-3 h-16 w-16 bg-highlightMed" />

<ThemeToggler />
