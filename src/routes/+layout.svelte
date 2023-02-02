<script>
	import SiteHeader from '$lib/components/SiteHeader.svelte';
	import '../app.postcss';
</script>

<div id="site-container" class="container mx-auto">
	<SiteHeader />

	<main id="main-content" class="min-h-screen">
		<slot />
	</main>

	<footer class="flex justify-between py-4">
		<p>&#169; Copyright 2022-{new Date().getFullYear()} Vincent Taneri</p>
		<div>Social Icons Placeholder</div>
	</footer>
</div>
