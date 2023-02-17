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

<section class="flex w-full flex-col space-y-16">
	<header>
		<h1 class="text-4xl font-bold tracking-tight sm:text-5xl">Welcome ~</h1>
		<p class="mt-6">
			This website is my humble abode on the internet, where I pen my musings about software
			development, specifically JavaScript, TypeScript and web technologies in general. If you enjoy
			my content, consider subscribing to my
			<a
				href="https://vitaneri.com/rss.xml"
				target="_blank"
				rel="noreferrer"
				class="hover-underline-animation text-accent"
			>
				RSS feed
			</a>
			, and if you feel so inclined, you're welcome to
			<a
				href="https://www.buymeacoffee.com/tvince"
				target="_blank"
				rel="noreferrer"
				class="hover-underline-animation text-accent"
			>
				buy me a coffee
			</a>
			.
		</p>
	</header>

	<section>
		<header class="mb-8 flex items-center">
			<h2 class="text-xl">Featured Posts</h2>
		</header>
		<PostsList posts={data.featuredPosts} />
	</section>

	<section>
		<header class="mb-8 flex items-center justify-between">
			<h2 class="text-xl">Recently Published</h2>
			<a
				href="/posts"
				class="hover-underline-animation flex items-center space-x-1 font-heading text-sm text-accent"
			>
				View All <ArrowRightIcon class="h-4 w-4" />
			</a>
		</header>
		<PostsList posts={data.posts} />
	</section>
</section>
