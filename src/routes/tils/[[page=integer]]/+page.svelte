<script lang="ts">
	import { page } from '$app/stores';
	import PageMeta from '$lib/components/PageMeta.svelte';
	import ArrowLeftIcon from '$lib/components/icons/ArrowLeftIcon.svelte';
	import ArrowRightIcon from '$lib/components/icons/ArrowRightIcon.svelte';
	import type { PageData } from './$types';
	import { format, parseISO } from 'date-fns';

	export let data: PageData;

	$: isFirstPage = data.page === 1;
</script>

<PageMeta
	title="TILs | Vitaneri"
	description="This is the place where I put some interesting facts, code snippets, and other random stuff"
	route={$page.url.pathname}
/>

<section class="flex w-full flex-col space-y-16">
	<header>
		<h1 class="text-4xl font-bold tracking-tight sm:text-5xl">TIL (Today I Learned)</h1>
		<p class="mt-6">
			This is the place where I put some interesting facts, code snippets, and other random stuff.
		</p>
	</header>

	<div>
		{#each data.TILs as TIL (TIL.id)}
			<article>
				<header class="flex items-center justify-between">
					<h2 class="text-4xl"><span class="mr-2 text-accent">#</span>{TIL.id}</h2>
					<time datetime={TIL.datetime}>
						{format(new Date(parseISO(TIL.datetime)), 'MMMM d, yyyy')}
					</time>
				</header>
				<div class="prose">
					<svelte:component this={TIL.component} />
				</div>
			</article>
		{/each}
	</div>

	<!-- pagination -->
	<footer class="flex items-center justify-between font-heading text-accent">
		{#if !isFirstPage}
			<a href={`/tils/${data.page - 1}`} class="hover-underline-animation flex items-center gap-2">
				<ArrowLeftIcon class="h-4 w-4" />
				Previous
			</a>
		{:else}
			<div />
		{/if}

		{#if data.hasNextPage}
			<a href={`/tils/${data.page + 1}`} class="hover-underline-animation flex items-center gap-2">
				Next
				<ArrowRightIcon class="h-4 w-4" />
			</a>
		{/if}
	</footer>
</section>
