<script lang="ts">
	import type { PostMetadata } from '$lib/types';
	import { format, parseISO } from 'date-fns';

	export let decorate = false;
	export let post: PostMetadata;
	export let collapsed = false;

	let _class: string;
	export { _class as class };
</script>

<div class={['relative z-10 order-first mb-3 flex', _class].join(' ')} class:pl-3.5={decorate}>
	{#if decorate}
		<span class="absolute inset-y-0 left-0 flex items-center py-1" aria-hidden="true">
			<span class="h-full w-1 rounded-full bg-muted" />
		</span>
	{/if}
	<div class="flex" class:flex-col={!collapsed}>
		<time datetime={post.datetime}>
			{format(new Date(parseISO(post.datetime)), 'MMMM d, yyyy')}
		</time>
		{#if collapsed}
			<span class="mx-1">&bull;</span>
		{/if}
		<span>{post.readingTime}</span>
	</div>
</div>
