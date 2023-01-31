<script lang="ts">
	import ArrowRightIcon from '$lib/components/ArrowRightIcon.svelte';
	import PostsList from '$lib/components/PostsList.svelte';
	import type { PageServerData } from './$types';

	export let data: PageServerData;
</script>

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
