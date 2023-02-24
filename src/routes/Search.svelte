<script lang="ts">
	import { onMount, createEventDispatcher } from 'svelte';
	import SearchInput from './SearchInput.svelte';
	import SearchEngine from './SearchEngine.svelte';
	import type { SearchData } from '$lib/types';

	let query: string = '';
	let data: SearchData[] = [];
	let result: Array<SearchData & { highlight: string }> = [];

	const dispatch = createEventDispatcher();

	function handleLinkClick() {
		dispatch('navigation');
	}

	onMount(() => {
		populateData();
	});

	async function populateData() {
		const sessionStoragePosts = window.sessionStorage.getItem('searchdata');
		if (sessionStoragePosts) {
			data = JSON.parse(sessionStoragePosts);
		} else {
			data = await fetchPosts();
			window.sessionStorage.setItem('searchdata', JSON.stringify(data));
		}
	}

	async function fetchPosts(): Promise<SearchData[]> {
		const res = await fetch('/searchdata.json');
		return res.json();
	}
</script>

<SearchInput bind:query />

<SearchEngine {query} {data} bind:result />

<ul
	class="no-scrollbar flex h-full w-full flex-col gap-4 overflow-scroll overscroll-y-contain text-sm text-subtle"
>
	{#each result as item}
		<li>
			<a
				href={`/posts/${item.slug}`}
				on:click={handleLinkClick}
				class="hover:bg-highlight/30 hover:text-accent"
			>
				{@html item.highlight}
			</a>
		</li>
	{/each}
</ul>

<style global lang="postcss">
	mark {
		@apply bg-highlight/30 text-accent;
	}
</style>
