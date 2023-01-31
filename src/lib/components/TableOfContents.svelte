<script lang="ts">
	import type { PostMetadata } from '$lib/types';

	export let post: PostMetadata;
	$: console.log(post.headings);

	// function setActiveHeading() {
	//   scrollY = window.scrollY

	//   const visibleIndex = elements.
	// }
</script>
