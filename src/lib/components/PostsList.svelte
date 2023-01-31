<script lang="ts">
	import type { PostMetadata } from '$lib/types';
	import PostDate from './PostDate.svelte';
	import PostPreview from './PostPreview.svelte';

	export let posts: PostMetadata[];
</script>

<div>
	{#each posts as post (post.slug)}
		<article>
			<PostDate class="hidden flex-col text-sm md:flex" {post} />
			<div class="col-span-4 md:col-span-3">
				<PostPreview {post}>
					<slot slot="eyebrow">
						<PostDate class="md:hidden" {post} collapsed decorate />
					</slot>
				</PostPreview>
			</div>
		</article>
	{/each}
</div>
