<script lang="ts">
	import { onMount } from 'svelte';
	import SearchInput from './SearchInput.svelte';

	let data: string[] = [];
	let query: string = '';

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
</script>

<SearchInput {query} />
