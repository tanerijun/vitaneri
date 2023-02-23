<script lang="ts">
	let _class: string = '';
	export { _class as class };
</script>

<button
	on:click
	class={`flex items-center justify-center rounded-lg border border-muted/20 p-2 transition-colors hover:border-muted hover:bg-lowlight hover:text-text ${_class}`}
	{...$$restProps}
>
	<slot />
</button>
