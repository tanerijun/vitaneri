<script lang="ts">
	let _class: string = '';
	export { _class as class };
</script>

<button
	on:click
	class={`flex items-center justify-center rounded-lg border border-muted bg-highlightLow p-2 transition-colors hover:border-subtle hover:text-text ${_class}`}
>
	<slot />
</button>
