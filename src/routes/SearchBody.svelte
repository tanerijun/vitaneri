<script lang="ts">
	import Typeahead from 'svelte-typeahead';
	import { onDestroy, onMount } from 'svelte';
	import { keyRedirect } from '$lib/actions/keyRedirect';

	let data: string[] = [];

	const fetchPosts = async () => {
		const res = await fetch('/posts.json');
		return res.json();
	};

	const registerKeyRedirect = (node: HTMLElement) => {
		function handleKeydown(e: KeyboardEvent) {
			if (node === document.activeElement) {
				return;
			}
			if (e.code.match(/\w/g)) {
				node.focus();
			}
		}

		console.log('registering event listener');
		window.addEventListener('keydown', handleKeydown);

		return () => {
			console.log('cleaning up');
			window.removeEventListener('keydown', handleKeydown);
		};
	};

	let cleanUp: (() => void) | undefined = undefined;

	onMount(async () => {
		const sessionStoragePosts = window.sessionStorage.getItem('posts');
		if (sessionStoragePosts) {
			data = JSON.parse(sessionStoragePosts);
		} else {
			data = await fetchPosts();
			window.sessionStorage.setItem('posts', JSON.stringify(data));
		}

		const searchFormRef = document.querySelector('[data-svelte-search]');
		const inputRef = searchFormRef?.querySelector('input');
		if (inputRef) {
			cleanUp = registerKeyRedirect(inputRef);
		}
	});

	onDestroy(() => {
		if (cleanUp) {
			cleanUp();
		}
	});
</script>

<Typeahead {data} />
