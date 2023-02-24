<script lang="ts">
	import { onMount, createEventDispatcher } from 'svelte';
	import SearchInput from './SearchInput.svelte';
	import SearchEngine from './SearchEngine.svelte';

	let query: string = '';
	let data: { [key: string]: any }[] = [];
	let result: any = [];

	const dispatch = createEventDispatcher();

	function handleLinkClick() {
		dispatch('navigation');
	}

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

	// Todo:
	// 2. give type to result
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
