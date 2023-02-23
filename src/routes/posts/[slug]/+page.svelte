<script lang="ts">
	import { page } from '$app/stores';
	import PageMeta from '$lib/components/PageMeta.svelte';
	import { afterNavigate } from '$app/navigation';
	import ArrowLeftIcon from '$lib/components/icons/ArrowLeftIcon.svelte';
	import PostDate from '$lib/components/PostDate.svelte';
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

<!-- <section class="grid w-full grid-cols-1 md:grid-cols-[48rem_1fr]"> -->
<section class="flex flex-col gap-8">
	<!-- goBack button -->
	<div class="w-fit font-heading text-accent">
		<svelte:element
			this={canGoBack ? 'button' : 'a'}
			class="hover-underline-animation flex items-center gap-1.5"
			href={canGoBack ? undefined : '/posts'}
			aria-label="Go back to posts"
			on:click={goBack}
			on:keydown={goBack}
		>
			<ArrowLeftIcon /> Go Back
		</svelte:element>
	</div>

	<article>
		<!-- Post header -->
		<header class="flex flex-col gap-6">
			<h1 class="text-4xl font-bold tracking-tight sm:text-5xl">
				{data.post.title}
			</h1>
			<PostDate class="text-sm" post={data.post} decorate collapsed />
		</header>

		<!-- Post content -->
		<div class="prose">
			<svelte:component this={data.component} />
		</div>

		<!-- Post footer -->
		<footer>
			<!-- Tags -->
			<div class="flex flex-wrap space-x-4">
				{#each data.post.tags as tag (tag)}
					<a href={`/tags/${tag}`}>
						<div class="flex gap-1 hover:text-text">
							<span class="flex items-center text-sm text-accent">#</span>{tag}
						</div>
					</a>
				{/each}
			</div>
		</footer>
	</article>
</section>
