<script lang="ts">
	import PostPreview from '../PostPreview.svelte';
	import { mockPostData } from '$lib/test-utils/mockPostData';

	let post = {
		...mockPostData,
		preview: {
			text: mockPostData.description,
			html: `<p data-testid="html-preview">${mockPostData.description}</p>`
		}
	};
</script>

<PostPreview {post}>
	<slot slot="eyebrow">
		<p>Hello from PostPreview's eyebrow</p>
	</slot>
</PostPreview>
