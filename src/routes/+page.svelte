<script lang="ts">
	import { page } from '$app/stores';
	import ArrowRightIcon from '$lib/components/icons/ArrowRightIcon.svelte';
	import PageMeta from '$lib/components/PageMeta.svelte';
	import PostsList from '$lib/components/PostsList.svelte';
	import type { PageServerData } from './$types';

	export let data: PageServerData;
</script>

<PageMeta
	title="Vitaneri"
	description="Personal website by Vincent Taneri"
	route={$page.url.pathname}
/>

<h1>Welcome to Vitaneri</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<section>Hero placeholder</section>

<section>
	<header class="mb-8 flex items-center justify-between">
		<h2 class="text-lg">Recently Published</h2>
		<a
			href="/posts"
			class="hover-underline-animation flex items-center gap-1 font-heading text-sm text-iris"
		>
			View All <ArrowRightIcon class="h-4 w-4" />
		</a>
	</header>
	<PostsList posts={data.posts} />
</section>
