<script>
	import { page } from '$app/stores';
	import PageMeta from '$lib/components/PageMeta.svelte';
</script>

<PageMeta
	title="Projects | Vitaneri"
	description="Personal projects by Vincent Taneri"
	route={$page.url.pathname}
/>

<section class="flex flex-col space-y-16">
	<header>
		<h1 class="text-4xl font-bold tracking-tight sm:text-5xl">Side Projects</h1>
		<p class="mt-6">These are some of my side projects that I think are worth sharing:</p>
	</header>

	<footer>
		<p>
			You can check out more side projects on my
			<a
				href="https://github.com/tanerijun"
				target="_blank"
				rel="noreferrer"
				class="hover-underline-animation text-iris"
			>
				Github
			</a>
			.
		</p>
	</footer>
</section>
