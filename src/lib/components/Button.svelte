<script lang="ts">
	export let as: 'button' | 'a' = 'button';
	let _class: string = '';
	export { _class as class };
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<svelte:element
	this={as}
	on:click
	class={`flex items-center justify-center rounded-lg p-2 transition-colors hover:bg-highlightLow hover:text-text ${_class}`}
>
	<slot />
</svelte:element>
