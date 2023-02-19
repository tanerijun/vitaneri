<script lang="ts">
	export let query: string;
</script>

<input
	type="text"
	placeholder="Search"
	class="h-10 w-full rounded-md border border-muted/20 bg-basis px-4 text-sm text-text placeholder-muted focus:border-transparent focus:outline-none focus:ring-2 focus:ring-accent"
	bind:value={query}
/>
