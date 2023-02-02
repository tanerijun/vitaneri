<script lang="ts">
	import { browser } from '$app/environment';
	import type { PostMetadata } from '$lib/types';
	import { onMount } from 'svelte';
	import Card from './Card.svelte';

	export let post: PostMetadata;

	let elements: HTMLElement[] = [];
	let headings = post.headings;

	onMount(() => {
		updateHeadings();
		setActiveHeading();
	});

	let activeHeading = headings[0];
	let scrollY: typeof window.scrollY;

	function updateHeadings() {
		headings = post.headings;

		if (browser) {
			elements = headings.map((heading) => {
				// The headings can't possibly be null because they're generated from the parsed and rendered markdown
				return document.getElementById(heading.id) as HTMLElement;
			});
		}
	}

	function setActiveHeading() {
		scrollY = window.scrollY;

		const visibleIndex = elements.findIndex(
			(element) => element.offsetTop + element.clientHeight > scrollY
		);

		activeHeading = headings[visibleIndex];

		const pageHeight = document.body.scrollHeight;
		const scrollProgress = (scrollY + window.innerHeight) / pageHeight;

		if (!activeHeading) {
			if (scrollProgress > 0.5) {
				activeHeading = headings[headings.length - 1];
			} else {
				activeHeading = headings[0];
			}
		}
	}
</script>

<svelte:window on:scroll={setActiveHeading} />

<Card>
	<slot slot="description">
		<h2 class="text-md text-md mb-2 pl-[5px] text-muted">ON THIS PAGE</h2>
		<ul class="flex flex-col gap-2">
			{#each headings as heading}
				<li
					class="heading border-rose pl-2 text-muted transition-colors hover:text-text"
					class:active={activeHeading === heading}
					style={`--depth: ${
						// Consider h1 and h2 at the same depth, as h1 will only be used for page title
						Math.max(0, heading.depth - 1)
					}`}
				>
					<a href={`#${heading.id}`}>{heading.value}</a>
				</li>
			{/each}
		</ul>
	</slot>
</Card>

<style lang="postcss">
	.heading {
		padding-left: calc(var(--depth, 0) * 0.35rem);
	}

	.active {
		@apply -ml-0.5 border-l-2 font-medium text-text;
	}
</style>
