<script>
	import '../app.postcss';
	import Footer from './Footer.svelte';
	import Header from './Header.svelte';
</script>

<div id="site-container" class="container mx-auto">
	<Header />

	<main id="main-content" class="min-h-screen">
		<slot />
	</main>

	<Footer />
</div>
