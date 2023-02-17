<script lang="ts">
	export let as = 'div';
	export let href: string = '';

	let _class: string = '';
	export { _class as class };
</script>

<svelte:element this={as} class={['group relative flex flex-col items-start', _class].join(' ')}>
	<slot name="eyebrow" />

	{#if $$slots.title}
		<div class="font-heading text-lg text-text">
			{#if href}
				<!-- Hover animation for card -->
				<div
					class="absolute -inset-y-6 -inset-x-4 z-0 scale-95 rounded-2xl bg-lowlight opacity-0 transition group-hover:scale-100 group-hover:opacity-100 sm:-inset-x-6"
				/>
				<a {href}>
					<!-- 
						This span make sure the card feels like a card when dragged or clicked,
						It safe user the trouble of clicking on title to go to the link.
						The user can now click anywhere on the card to go to the link.
					-->
					<span class="absolute -inset-y-6 -inset-x-4 z-20 rounded-2xl sm:-inset-x-6" />
					<span class="relative z-10">
						<slot name="title" />
					</span>
				</a>
			{:else}
				<slot name="title" />
			{/if}
		</div>
	{/if}

	{#if $$slots.description}
		<div class="relative z-10 flex-1 text-sm text-subtle" class:mt-2={!!$$slots.title}>
			<slot name="description" />
		</div>
	{/if}

	{#if $$slots.actions}
		<div aria-hidden="true" class="relative z-10 mt-4 flex items-center">
			<slot name="actions" />
		</div>
	{/if}
</svelte:element>
