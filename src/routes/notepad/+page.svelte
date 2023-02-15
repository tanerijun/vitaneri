<script>
	import { page } from '$app/stores';
	import PageMeta from '$lib/components/PageMeta.svelte';
</script>

<PageMeta
	title="Notepad | Vitaneri"
	description="This is the place where I sketch out code snippets, TILs, and other random stuff"
	route={$page.url.pathname} />

<section>
	<header>
		<h1 class="text-4xl font-bold tracking-tight sm:text-5xl">Notepad</h1>
		<p class="mt-6">
			This is the place where I put some code snippets, TILs, and other random stuff.
		</p>
	</header>
</section>
