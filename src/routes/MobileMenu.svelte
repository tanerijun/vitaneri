<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import MenuCloseIcon from '$lib/components/icons/MenuCloseIcon.svelte';
	import MenuIcon from '$lib/components/icons/MenuIcon.svelte';

	let isOpen = false;

	function handleClick() {
		isOpen = !isOpen;
	}
</script>

<Button on:click={handleClick}>
	{#if isOpen}
		<MenuCloseIcon />
	{:else}
		<MenuIcon />
	{/if}
</Button>
