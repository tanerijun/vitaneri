<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import SearchIcon from '$lib/components/icons/SearchIcon.svelte';
	import { createDialog } from '@melt-ui/svelte';
	import { scale } from 'svelte/transition';
	import Search from './Search.svelte';

	const { trigger, portal, overlay, content, open } = createDialog({
		preventScroll: false
	});

	function openModal() {
		$open = true;
	}

	function closeModal() {
		$open = false;
	}

	function toggleModal() {
		$open = !$open;
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key.toLowerCase() === 'k' && (e.ctrlKey || e.metaKey)) {
			e.preventDefault();
			toggleModal();
		}
	}
</script>

<svelte:window on:keydown={handleKeydown} />

<Button melt={$trigger} aria-label="Search" on:click={openModal}>
	<SearchIcon />
</Button>

<div use:portal>
	{#if $open}
		<div melt={$overlay} class="fixed inset-0 z-40 bg-black/20" />
		<div
			melt={$content}
			transition:scale={{ duration: 150 }}
			class="fixed left-1/2 top-1/2 z-50 flex h-[80%] w-[80%] -translate-x-1/2 -translate-y-1/2 flex-col space-y-4 rounded-xl bg-overlay/95 p-4 shadow-xl backdrop-blur-sm transition-all md:h-[70%] md:w-1/2 md:max-w-md md:px-4"
		>
			<Search on:navigation={closeModal} />
			<p class="hidden border-t border-muted/20 pt-4 text-sm md:block">
				Press <kbd class="ml-1">Ctrl</kbd> + <kbd class="mr-1">K</kbd> to search from anywhere.
			</p>
		</div>
	{/if}
</div>

<style lang="postcss">
	kbd {
		@apply rounded-sm border border-muted px-1 py-0.5 text-xs;
	}
</style>
