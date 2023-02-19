<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import SearchIcon from '$lib/components/icons/SearchIcon.svelte';
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

<Button>
	<SearchIcon />
</Button>
