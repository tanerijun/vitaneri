<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import type { PageData } from './$types';

	export let data: PageData;

	const url = `https://vitaneri.com/posts/${data.post.slug}`;

	// If we come to this route from the /posts route,
	// use history when going back to preserve posts pagination
	let canGoBack = false;
	afterNavigate(({ from }) => {
		if (from && from.url.pathname.startsWith('/posts')) {
			canGoBack = true;
		}
	});

	function goBack() {
		if (canGoBack) {
			history.back();
		}
	}
</script>

<svelte:head>
	<title>{data.post.title} | Vitaneri</title>
	<meta name="title" content={data.post.title + ' | Vitaneri'} />
	<meta name="description" content={data.post.preview.text} />
	<meta name="author" content={data.post.author} />

	<!-- Facebook Meta Tags -->
	<meta property="og:url" content={url} />
	<meta property="og:type" content="website" />
	<meta property="og:title" content={data.post.title} />
	<meta property="og:description" content={data.post.preview.text} />
	<meta property="og:image" content="https://vitaneri.com/vitaneri-og.png" />

	<!-- Twitter Meta Tags -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta property="twitter:domain" content="https://vitaneri.com" />
	<meta property="twitter:url" content={url} />
	<meta name="twitter:title" content={data.post.title} />
	<meta name="twitter:description" content={data.post.preview.text} />
	<meta name="twitter:image" content="https://vitaneri.com/vitaneri-og.png" />
</svelte:head>
