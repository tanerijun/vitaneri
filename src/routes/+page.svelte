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
			Welcome to my virtual sanctuary, a space where I share my musings on the world of software
			development, specifically delving into JavaScript, TypeScript, and web technologies. If my
			content resonates with you, consider subscribing to my <a
				href="https://vitaneri.com/rss.xml"
				target="_blank"
				rel="noreferrer"
				class="hover-underline-animation text-accent">RSS feed</a
			>
			to stay updated. And if you're feeling generous, you can also show your support by
			<a
				href="https://www.buymeacoffee.com/tvince"
				target="_blank"
				rel="noreferrer"
				class="hover-underline-animation text-accent">treating me to a coffee.</a
			> Thank you for stopping by and being a part of my online journey!
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
				class="hover-underline-animation flex items-center gap-1.5 font-heading text-sm text-accent"
			>
				View All <ArrowRightIcon />
			</a>
		</header>
		<PostsList posts={data.posts} />
	</section>
</section>
