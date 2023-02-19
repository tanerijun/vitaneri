<script lang="ts">
	import { onMount } from 'svelte';

	onMount(() => {
		fetch('/searchdb.json', {
			headers: {
				Accept: 'application/json'
			}
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
			});
	});
</script>

<div>Search Body</div>
