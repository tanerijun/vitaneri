<script lang="ts">
	import { navigating } from '$app/stores';
	import { fade } from 'svelte/transition';
</script>

<!-- @component
  Show a loading indicator when navigating take too long
-->
{#if Boolean($navigating)}
	<div
		class="fixed z-[999] flex h-screen w-screen items-center justify-center bg-basis opacity-70"
		in:fade={{ duration: 150 }}
	>
		<div
			class="h-12 w-12 animate-spin rounded-full border-y-8 border-solid border-accent border-t-transparent"
		/>
	</div>
{/if}
