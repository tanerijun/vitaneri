<script lang="ts">
	import Typeahead from 'svelte-typeahead';
	import { onMount } from 'svelte';

	let data: string[] = [];

	const fetchPosts = async () => {
		const res = await fetch('/posts.json');
		return res.json();
	};

	onMount(async () => {
		const sessionStoragePosts = window.sessionStorage.getItem('posts');
		if (sessionStoragePosts) {
			data = JSON.parse(sessionStoragePosts);
		} else {
			data = await fetchPosts();
			window.sessionStorage.setItem('posts', JSON.stringify(data));
		}
	});
</script>

<Typeahead {data} />
