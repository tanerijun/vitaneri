<script lang="ts">
	import type { PostMetadata } from '$lib/types';
	import PostDate from './PostDate.svelte';

	export let posts: PostMetadata[];
</script>

<div>
	{#each posts as post (post.slug)}
		<article>
			<PostDate class="hidden flex-col text-sm md:flex" {post} />

			<div />
		</article>
	{/each}
</div>
