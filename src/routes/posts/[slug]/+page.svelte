<script lang="ts">
	import { page } from '$app/stores';
	import PageMeta from '$lib/components/PageMeta.svelte';
	import { afterNavigate } from '$app/navigation';
	import ArrowLeftIcon from '$lib/components/icons/ArrowLeftIcon.svelte';
	import PostDate from '$lib/components/PostDate.svelte';
	import TableOfContents from '$lib/components/TableOfContents.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

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

<PageMeta
	title={`${data.post.title} | Vitaneri`}
	description={data.post.preview.text}
	route={$page.url.pathname}
/>

<section class="grid grid-cols-[48rem_1fr]">
	<div>
		<!-- goBack button -->
		<div class="mb-8 w-fit font-heading text-iris">
			<svelte:element
				this={canGoBack ? 'button' : 'a'}
				class="hover-underline-animation flex items-center gap-2"
				href={canGoBack ? undefined : '/posts'}
				aria-label="Go back to posts"
				on:click={goBack}
				on:keydown={goBack}
			>
				<ArrowLeftIcon class="h-4 w-4" /> Go Back
			</svelte:element>
		</div>

		<article>
			<!-- Post header -->
			<header class="flex flex-col">
				<h1 class="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">
					{data.post.title}
				</h1>
				<PostDate class="text-sm" post={data.post} decorate collapsed />
			</header>

			<!-- Post content -->
			<div class="prose w-full">
				<svelte:component this={data.component} />
			</div>

			<!-- Post footer -->
			<footer>
				{data.post.tags} TODO
			</footer>
		</article>
	</div>

	<!-- Table of contents -->
	<div class="hidden xl:block">
		<aside class="sticky top-8 ml-8 w-48" aria-label="Table of Contents">
			<TableOfContents post={data.post} />
		</aside>
	</div>
</section>
