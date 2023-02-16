<script lang="ts">
	import { page } from '$app/stores';
	import PageMeta from '$lib/components/PageMeta.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<PageMeta
	title="Tags | Vitaneri"
	description="Search through Vitaneri with tags"
	route={$page.url.pathname} />

<section>
	<header>
		<h1 class="text-4xl font-bold tracking-tight sm:text-5xl">Tags</h1>
		<p class="mt-6">Filter posts by tag.</p>
	</header>

	<div class="mt-16 md:columns-2">
		{#each [...data.tagsData] as [letter, tagsMap] (letter)}
			<div class="mb-8 flex break-inside-avoid-column flex-col gap-4">
				<h3 class="text-4xl">{letter.toUpperCase()}</h3>
				<ul class="grid grid-cols-2">
					{#each [...tagsMap] as [tag, count] (tag)}
						<li>
							<a href={`/tags/${tag}`} class="flex gap-1 hover:text-text">
								<span class="flex items-center text-sm text-iris">#</span>{tag} ({count})
							</a>
						</li>
					{/each}
				</ul>
			</div>
		{/each}
	</div>
</section>
