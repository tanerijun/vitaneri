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

<!-- 42rem on large screen matches max-w-2xl on smaller screen-->
<!-- <section class="mx-auto grid max-w-2xl grid-cols-1 lg:max-w-none lg:grid-cols-[42rem_1fr]"> -->
<section class="flex flex-col border border-blue-400">
	<!-- <div class="mx-auto w-full overflow-x-hidden"> -->
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
			<h1 class="my-6 text-4xl font-bold tracking-tight sm:text-5xl">
				{data.post.title}
			</h1>
			<PostDate class="text-sm" post={data.post} decorate collapsed />
		</header>

		<!-- Post content -->
		<div class="prose mx-auto w-full border border-purple-400 dark:prose-invert">
			<svelte:component this={data.component} />
		</div>
	</article>
	<!-- </div> -->
</section>
<!-- Table of contents -->
<div class="hidden pt-10 xl:block">
	<aside class="sticky top-8 ml-8 hidden w-48 xl:block" aria-label="Table of Contents">
		<TableOfContents post={data.post} />
	</aside>
</div>
