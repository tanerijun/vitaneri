<script lang="ts">
	import Typeahead from 'svelte-typeahead';
	import { onDestroy, onMount } from 'svelte';

	let data: string[] = [];
	// Clean up to call on destroy when event listener is registered successfully.
	let cleanUp: (() => void) | undefined = undefined;

	const fetchPosts = async () => {
		const res = await fetch('/posts.json');
		return res.json();
	};

	const populateData = async () => {
		const sessionStoragePosts = window.sessionStorage.getItem('posts');
		if (sessionStoragePosts) {
			data = JSON.parse(sessionStoragePosts);
		} else {
			data = await fetchPosts();
			window.sessionStorage.setItem('posts', JSON.stringify(data));
		}
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

		window.addEventListener('keydown', handleKeydown);

		return () => {
			window.removeEventListener('keydown', handleKeydown);
		};
	};

	const registerKeyRedirectToInput = () => {
		const inputRef = document.querySelector('[data-svelte-search] input');
		if (inputRef) {
			cleanUp = registerKeyRedirect(inputRef as HTMLElement);
		}
	};

	onMount(() => {
		populateData();
		registerKeyRedirectToInput();
	});

	onDestroy(() => {
		if (cleanUp) {
			cleanUp();
		}
	});
</script>

<Typeahead {data} />
