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

<Button {...$triggerAttrs} on:click={openModal}>
	<SearchIcon />
</Button>

{#if $open}
	<div
		use:useModal
		{...$modalAttrs}
		transition:scale={{ duration: 150 }}
		class="fixed left-1/2 top-1/2 z-50 flex h-[80%] w-[80%] -translate-x-1/2 -translate-y-1/2 flex-col space-y-4 rounded-xl bg-overlay/95 p-4 shadow-xl backdrop-blur-sm transition-all md:h-[70%] md:w-1/2 md:max-w-md md:px-4"
	>
		<Search on:navigation={closeModal} />
		<p class="hidden border-t border-muted/20 pt-4 text-sm md:block">
			Press <kbd>Ctrl</kbd> + <kbd>K</kbd> to search from anywhere.
		</p>
	</div>
{/if}

<style lang="postcss">
	kbd {
		@apply rounded-sm border border-muted py-0.5 px-1 text-xs;
	}
</style>
