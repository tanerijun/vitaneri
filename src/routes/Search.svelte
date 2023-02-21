<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import SearchIcon from '$lib/components/icons/SearchIcon.svelte';
	import { createModal } from '@grail-ui/svelte';
	import { scale } from 'svelte/transition';
	import SearchInput from './SearchInput.svelte';
	import SearchBody from './SearchBody.svelte';

	let query: string = '';

	const { useModal, modalAttrs, triggerAttrs, open } = createModal({
		portal: null,
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
		class="fixed left-1/2 top-1/2 z-50 flex max-w-md -translate-x-1/2 -translate-y-1/2 flex-col space-y-6 rounded-2xl bg-overlay/95 p-8 shadow-xl backdrop-blur-sm transition-all"
	>
		<SearchBody />

		<!-- <SearchInput bind:query /> -->
		<div class="mt-2">
			<p class="text-sm text-gray-500">
				Your payment has been successfully submitted. We’ve sent you an email with all of the
				details of your order.
			</p>
			<p>{query}</p>
		</div>

		<div class="mt-4">
			<button
				type="button"
				on:click={() => ($open = false)}
				class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
				>Got it, thanks!</button
			>
		</div>
	</div>
{/if}
