<script lang="ts">
	import type { PostMetadata } from '$lib/types';
	import Card from './Card.svelte';
	import ArrowRightIcon from './icons/ArrowRightIcon.svelte';

	export let post: PostMetadata;
</script>

<Card href={`/posts/${post.slug}`}>
	<slot slot="eyebrow" name="eyebrow" />
	<slot slot="title">{post.title}</slot>
	<div slot="description">
		<!-- 
			In the case where the "description" is provided in frontmatter,
			`post.preview.html` will equal `post.preview.text` because,
			frontmatter will be parsed by mdsvex as plain text, unlike markdown.
		-->
		{#if post.preview.html === post.preview.text}
			<p>{post.preview.text}</p>
		{:else}
			{@html post.preview.html}
		{/if}
	</div>
	<div slot="actions">
		<div class="flex items-center text-iris">
			<span class="text-sm">Read</span>
			<ArrowRightIcon class="ml-1 h-4 w-4" />
		</div>
	</div>
</Card>
