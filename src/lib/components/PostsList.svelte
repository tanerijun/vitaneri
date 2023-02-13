<script lang="ts">
	import type { PostMetadata } from '$lib/types';
	import PostDate from './PostDate.svelte';
	import PostPreview from './PostPreview.svelte';

	export let posts: PostMetadata[];
</script>

<div class="flex flex-col gap-16 md:border-l md:border-muted/20 md:pl-6">
	{#each posts as post (post.slug)}
		<article class="grid grid-cols-4 items-start gap-8">
			<!-- PostDate on wide screen -->
			<PostDate class="m-[2px] hidden flex-col text-sm md:flex" {post} />
			<div class="col-span-4 md:col-span-3">
				<PostPreview {post}>
					<slot slot="eyebrow">
						<!-- PostDate for small screen -->
						<PostDate class="md:hidden" {post} collapsed decorate />
					</slot>
				</PostPreview>
			</div>
		</article>
	{/each}
</div>
