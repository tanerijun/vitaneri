<script>
	import { page } from '$app/stores';
	import PageMeta from '$lib/components/PageMeta.svelte';
</script>

<PageMeta
	title="Notepad | Vitaneri"
	description="This is the place where I sketch out code snippets, TILs, and other random stuff"
	route={$page.url.pathname}
/>

<section class="flex flex-col space-y-16">
	<header>
		<h1 class="text-4xl font-bold tracking-tight sm:text-5xl">TIL (Today I Learned)</h1>
		<p class="mt-6">
			This is the place where I put some interesting facts, code snippets, and other random stuff.
		</p>
	</header>
</section>
