<script lang="ts">
	import ArrowLeftIcon from '$lib/components/icons/ArrowLeftIcon.svelte';
	import PostsList from '$lib/components/PostsList.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<section>
	<header>
		<h1 class="text-4xl font-bold tracking-tight sm:text-5xl">Tag</h1>
		<p class="mt-6">
			Posts tagged with <span class="text-iris"><span class="mr-0.5">#</span>{data.tag}</span>:
		</p>
	</header>

	<div class="mt-16">
		<PostsList posts={data.posts} />
	</div>

	<footer>
		<a href="/tags" class="hover-underline-animation mt-16 flex w-fit items-center gap-1 text-iris">
			<ArrowLeftIcon class="h-4 w-4" /> Go back
		</a>
	</footer>
</section>
