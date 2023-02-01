<script lang="ts">
	import { page } from '$app/stores';
	import PageMeta from '$lib/components/PageMeta.svelte';
	import { afterNavigate } from '$app/navigation';
	import ArrowLeftIcon from '$lib/components/ArrowLeftIcon.svelte';
	import PostDate from '$lib/components/PostDate.svelte';
	import TableOfContents from '$lib/components/TableOfContents.svelte';
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

<PageMeta
	title={`${data.post.title} | Vitaneri`}
	description={data.post.preview.text}
	route={$page.url.pathname}
/>

<!-- 42rem on large screen matches max-w-2xl on smaller screen-->
<div class="mx-auto grid max-w-2xl grid-cols-1 lg:max-w-none lg:grid-cols-[1fr_42rem_1fr]">
	<div class="hidden pt-8 lg:block">
		<!-- goBack button -->
		<div class="sticky top-0 flex w-full justify-end pt-11 pr-8">
			<svelte:element
				this={canGoBack ? 'button' : 'a'}
				class="group -top-1 -left-16 mb-8 hidden h-10 w-10 items-center justify-center rounded-full border border-zinc-700/50 bg-white shadow-md shadow-zinc-800/5 ring-1 ring-white/10 transition hover:border-zinc-700 hover:ring-white/20 focus-visible:ring-2 lg:flex"
				href={canGoBack ? undefined : '/posts'}
				aria-label="Go back to posts"
				on:click={goBack}
				on:keydown={goBack}
			>
				<ArrowLeftIcon class="h-4 w-4 stroke-zinc-500 transition group-hover:stroke-zinc-700" />
			</svelte:element>
		</div>
	</div>

	<div class="mx-auto w-full overflow-x-hidden">
		<article>
			<!-- Post header -->
			<header class="flex flex-col">
				<h1 class="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">
					{data.post.title}
				</h1>
				<PostDate class="text-sm" post={data.post} decorate collapsed />
			</header>

			<!-- Post content -->
			<div class="prose dark:prose-invert">
				<svelte:component this={data.component} />
			</div>
		</article>
	</div>

	<!-- Table of contents -->
	<div class="hidden pt-10 xl:block">
		<aside class="sticky top-8 ml-8 hidden w-48 xl:block" aria-label="Table of Contents">
			<TableOfContents post={data.post} />
		</aside>
	</div>
</div>
