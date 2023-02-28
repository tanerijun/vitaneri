<script lang="ts">
	import Card from '../Card.svelte';

	export let href: string = '';
</script>

<Card {href}>
	<slot slot="eyebrow">
		<p>Hello from eyebrow slot</p>
	</slot>
	<slot slot="title">
		<p>Hello from title slot</p>
	</slot>
	<div slot="description">
		<p>Hello from description slot</p>
	</div>
	<div slot="actions">
		<p>Hello from actions slot</p>
	</div>
</Card>
