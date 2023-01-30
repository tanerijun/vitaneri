<script lang="ts">
	import PostsList from '$lib/components/PostsList.svelte';
	import type { PageServerData } from './$types';

	export let data: PageServerData;
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<section>Hero placeholder</section>

<section>
	<header class="flex justify-between">
		<h2>Recently Published</h2>
		<a href="/posts"> View All (-> icon placeholder) </a>
	</header>
	<PostsList posts={data.posts} />
</section>
