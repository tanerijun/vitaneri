<script>
	import { page } from '$app/stores';
	import ThemeToggler from '$lib/components/ThemeToggler.svelte';
	import '../app.postcss';
</script>

<div id="site-container" class="container mx-auto">
	<header>
		<a
			id="skip-to-content"
			href="#main-content"
			class="top absolute -top-full left-16 z-50 bg-overlay p-2 text-text transition-all focus:top-4 focus:ring"
		>
			Skip to content
		</a>
		<div class="flex justify-between py-4">
			<div id="site-logo">
				<a href="/">
					<h1>Vitaneri</h1>
				</a>
			</div>
			<nav>
				<ul class="flex space-x-4">
					<li>
						<a class={$page.url.pathname.includes('posts') ? 'text-text' : null} href="/posts">
							Posts
						</a>
					</li>
					<li>
						<a
							class={$page.url.pathname.includes('projects') ? 'text-text' : null}
							href="/projects"
						>
							Projects
						</a>
					</li>
					<li>
						<a class={$page.url.pathname.includes('about') ? 'text-text' : null} href="/about">
							About
						</a>
					</li>
					<li>
						<ThemeToggler />
					</li>
					<li>Search Icon</li>
				</ul>
			</nav>
		</div>
	</header>

	<main id="main-content" class="min-h-screen">
		<slot />
	</main>

	<footer class="flex justify-between">
		<p>&#169; Copyright 2022-{new Date().getFullYear()} Vincent Taneri</p>
		<div>Social Icons Placeholder</div>
	</footer>
</div>
