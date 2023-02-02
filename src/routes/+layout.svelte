<script>
	import '../app.postcss';
	import SiteFooter from '$lib/components/SiteFooter.svelte';
	import SiteHeader from '$lib/components/SiteHeader.svelte';
</script>

<div id="site-container" class="container mx-auto">
	<SiteHeader />

	<main id="main-content" class="min-h-screen">
		<slot />
	</main>

	<SiteFooter />
</div>
