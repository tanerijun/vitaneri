<script>
	import { page } from '$app/stores';
	import PageMeta from '$lib/components/PageMeta.svelte';
</script>

<PageMeta
	title="Tags | Vitaneri"
	description="Search through Vitaneri with tags"
	route={$page.url.pathname} />

<section>
	<header>
		<h1 class="text-4xl font-bold tracking-tight sm:text-5xl">Tags</h1>
		<p class="mt-6">Search Vitaneri with tags.</p>
	</header>
</section>
