<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import MenuCloseIcon from '$lib/components/icons/MenuCloseIcon.svelte';
	import MenuIcon from '$lib/components/icons/MenuIcon.svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher<{ change: { isOpen: boolean } }>();

	let _class: string = '';
	export { _class as class };

	let isOpen = false;

	function handleClick() {
		isOpen = !isOpen;

		dispatch('change', {
			isOpen
		});
	}
</script>

<!-- @component
Dispatch a change event containing the payload `{isOpen: boolean}` every time the button is clicked 

Listen to the event with `on:change`
-->
<Button on:click={handleClick} class={_class}>
	{#if isOpen}
		<MenuCloseIcon />
	{:else}
		<MenuIcon />
	{/if}
</Button>
