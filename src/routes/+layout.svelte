<script lang="ts">
	import '../app.postcss';
	import Footer from './Footer.svelte';
	import Header from './Header.svelte';
	import LoadThemeScript from './LoadThemeScript.svelte';
	import NavigationLoading from './NavigationLoading.svelte';
</script>

<LoadThemeScript />

<NavigationLoading />

<div id="site-container" class="mx-auto flex min-h-screen max-w-3xl flex-col px-6">
	<Header />

	<main id="main-content" class="flex flex-1 items-center justify-center">
		<slot />
	</main>

	<Footer />
</div>
