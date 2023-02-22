<script lang="ts">
	import { onMount } from 'svelte';
	import SearchInput from './SearchInput.svelte';
	import Fuzzy from 'svelte-fuzzy';
	import type { FormattedResult } from 'svelte-fuzzy/types/Fuzzy.svelte';

	let query: string = '';
	let data: { [key: string]: any }[] = [];
	let formatted: FormattedResult = [];

	let fuseOptions = {
		keys: ['title']
	};

	onMount(() => {
		populateData();
	});

	async function populateData() {
		const sessionStoragePosts = window.sessionStorage.getItem('posts');
		if (sessionStoragePosts) {
			data = JSON.parse(sessionStoragePosts);
		} else {
			data = await fetchPosts();
			window.sessionStorage.setItem('posts', JSON.stringify(data));
		}
	}

	async function fetchPosts() {
		const res = await fetch('/posts.json');
		return res.json();
	}

	$: console.log(formatted);
</script>

<SearchInput bind:query />

<Fuzzy {query} {data} options={fuseOptions} bind:formatted />

<ul>
	{#each formatted as item}
		{#each item as line}
			<li>
				{#each line as { matches, text }}
					{#if matches}
						<mark>{text}</mark>
					{:else}
						{text}
					{/if}
				{/each}
			</li>
		{/each}
	{/each}
</ul>
