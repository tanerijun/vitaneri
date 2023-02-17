<script lang="ts">
	import ArrowLeftIcon from '$lib/components/icons/ArrowLeftIcon.svelte';
	import PostsList from '$lib/components/PostsList.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<section class="flex w-full flex-col space-y-16">
	<header>
		<h1 class="text-4xl font-bold tracking-tight sm:text-5xl">Tag</h1>
		<p class="mt-6">
			Posts tagged with <span class="text-accent"><span class="mr-0.5">#</span>{data.tag}</span>:
		</p>
	</header>

	<div>
		<PostsList posts={data.posts} />
	</div>

	<footer>
		<a href="/tags" class="hover-underline-animation flex w-fit items-center gap-1 text-accent">
			<ArrowLeftIcon class="h-4 w-4" /> Go back
		</a>
	</footer>
</section>
