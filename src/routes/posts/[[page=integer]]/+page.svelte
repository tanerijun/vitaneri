<script lang="ts">
	import { page } from '$app/stores';
	import ArrowLeftIcon from '$lib/components/icons/ArrowLeftIcon.svelte';
	import ArrowRightIcon from '$lib/components/icons/ArrowRightIcon.svelte';
	import PageMeta from '$lib/components/PageMeta.svelte';
	import PostsList from '$lib/components/PostsList.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	$: isFirstPage = data.page === 1;
	$: hasNextPage = data.posts[data.posts.length - 1]?.previous;
</script>

<PageMeta
	title="Posts | Vitaneri"
	description="List of blog posts by Vitaneri"
	route={$page.url.pathname}
/>

<section class="flex flex-grow flex-col">
	<header>
		<h1 class="text-4xl font-bold tracking-tight sm:text-5xl">My Tech Notebook</h1>
		<p class="mt-6">
			I like to think of this section as notes for my future self, thence the name "My Tech
			Notebook".
		</p>
	</header>

	<div class="mt-16 sm:mt-20">
		<PostsList posts={data.posts} />
	</div>

	<!-- pagination -->
	<section class="mt-16 flex items-center justify-between font-heading text-iris">
		{#if !isFirstPage}
			<a href={`/posts/${data.page - 1}`} class="hover-underline-animation flex items-center gap-2">
				<ArrowLeftIcon class="h-4 w-4" />
				Previous
			</a>
		{:else}
			<div />
		{/if}

		{#if hasNextPage}
			<a href={`/posts/${data.page + 1}`} class="hover-underline-animation flex items-center gap-2">
				Next
				<ArrowRightIcon class="h-4 w-4" />
			</a>
		{/if}
	</section>
</section>
