<script lang="ts">
	export let query: string;
	let searchDB: any;
	let results: any;
</script>

{#if searchDB}
	<div>{query}</div>
{/if}
