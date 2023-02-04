<script>
	import '../app.postcss';
	import Footer from './Footer.svelte';
	import Header from './Header.svelte';
	import LoadThemeScript from './LoadThemeScript.svelte';
</script>

<LoadThemeScript />

<div id="site-container" class="container mx-auto px-6">
	<Header />

	<main id="main-content" class="min-h-screen">
		<slot />
	</main>

	<Footer />
</div>
