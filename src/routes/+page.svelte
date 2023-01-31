<script lang="ts">
	import ArrowRightIcon from '$lib/components/ArrowRightIcon.svelte';
	import PostsList from '$lib/components/PostsList.svelte';
	import type { PageServerData } from './$types';

	export let data: PageServerData;
</script>

<svelte:head>
	<title>Vitaneri</title>
	<meta name="description" content="Personal website by Vincent Taneri" />
	<meta name="author" content="Vincent Taneri" />

	<!-- Open Graph / Facebook -->
	<meta property="og:title" content="Vitaneri" />
	<meta property="og:description" content="Personal website by Vincent Taneri" />
	<meta property="og:url" content="https://vitaneri.com" />
	<meta property="og:image" content="https://vitaneri.com/vitaneri-og.png" />

	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content="https://vitaneri.com" />
	<meta property="twitter:title" content="Vitaneri" />
	<meta property="twitter:description" content="Personal website by Vincent Taneri" />
	<meta property="twitter:image" content="https://vitaneri.com/vitaneri-og.png" />
</svelte:head>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<section>Hero placeholder</section>

<section>
	<header class="mb-8 flex items-center justify-between">
		<h2>Recently Published</h2>
		<a href="/posts" class="flex items-center gap-1 text-sm">
			View All <ArrowRightIcon class="h-4 w-4" /></a
		>
	</header>
	<PostsList posts={data.posts} />
</section>
