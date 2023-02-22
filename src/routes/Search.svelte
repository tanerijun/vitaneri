<script lang="ts">
	import { onMount, createEventDispatcher } from 'svelte';
	import SearchInput from './SearchInput.svelte';
	import Fuzzy from 'svelte-fuzzy';

	let query: string = '';
	let data: { [key: string]: any }[] = [];
	let result: any = [];

	const dispatch = createEventDispatcher();

	function handleLinkClick() {
		dispatch('navigation');
	}

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

	$: console.log(result);

	// Todo:
	// 2. give type to result
	// 3. remove unnecessary data from posts.json
</script>

<SearchInput bind:query />

<Fuzzy {query} {data} options={fuseOptions} bind:result />

<ul class="no-scrollbar flex h-full w-full flex-col gap-4 overflow-scroll text-sm text-subtle">
	{#each result as item}
		<li>
			<a href={`/posts/${item.slug}`} on:click={handleLinkClick}>
				{#each item.title as { matches, text }}
					{#if matches}
						<mark class="bg-highlight text-accent">{text}</mark>
					{:else}
						{text}
					{/if}
				{/each}
			</a>
		</li>
	{/each}
</ul>

<!-- <ul class="no-scrollbar flex h-full w-full flex-col gap-4 overflow-scroll text-sm text-subtle">
	{#each formatted as item}
		{#each item as line}
			<li>
				{#each line as { matches, text }}
					{#if matches}
						<mark class="bg-highlight text-accent">{text}</mark>
					{:else}
						{text}
					{/if}
				{/each}
			</li>
		{/each}
	{/each}
</ul> -->
