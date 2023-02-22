<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import SearchIcon from '$lib/components/icons/SearchIcon.svelte';
	import { createModal } from '@grail-ui/svelte';
	import { scale } from 'svelte/transition';
	import Search from './Search.svelte';

	const { useModal, modalAttrs, triggerAttrs, open } = createModal({
		portal: 'body',
		dismissible: true,
		open: false
	});
</script>

<Button {...$triggerAttrs} on:click={() => ($open = true)}>
	<SearchIcon />
</Button>

{#if $open}
	<div
		use:useModal
		{...$modalAttrs}
		transition:scale={{ duration: 150 }}
		class="no-scrollbar fixed left-1/2 top-1/2 z-50 h-[80%] w-[80%] -translate-x-1/2 -translate-y-1/2 overflow-scroll rounded-2xl bg-overlay/95 p-4 shadow-xl backdrop-blur-sm transition-all md:h-1/2 md:w-1/2 md:max-w-md md:p-8"
	>
		<Search />
	</div>
{/if}
