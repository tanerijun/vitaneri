<script lang="ts">
	import { page } from '$app/stores';
	import { capitalizeFirstLetterOfWord } from '$lib/utils';
	import { onMount } from 'svelte';
	import ThemeToggler from './Navbar/ThemeToggler.svelte';

	let routes = ['posts', 'projects', 'about'];
</script>

<div class="flex items-center justify-between border border-love py-4">
	<div id="site-logo">
		<a href="/">
			<h1 class="select-none text-3xl tracking-wide">Vitaneri</h1>
		</a>
	</div>
	<nav>
		<ul class="flex space-x-4 border border-teal-100">
			{#each routes as route (route)}
				<li>
					<a
						class:text-text={$page.url.pathname.includes(route)}
						class:active={$page.url.pathname.includes(route)}
						class="relative hover:text-text"
						href={`/${route}`}
					>
						{capitalizeFirstLetterOfWord(route)}
					</a>
				</li>
			{/each}
			<li>
				<ThemeToggler />
			</li>
			<li>Search Icon</li>
		</ul>
	</nav>
</div>

<style lang="postcss">
	/* .active::before { */
	/* content: '';
		position: absolute;
		background: #fff;
		height: 4px;
		width: 10px;
		bottom: -8px;
		transition: 3s;
		border-radius: 4px; */
	/* content: '';
		position: absolute;
		width: 15px;
		height: 15px;
		-moz-border-radius: 7.5px;
		-webkit-border-radius: 7.5px;
		border-radius: 7.5px;
		background-color: #69b6d5;
	} */
	.active {
		@apply bg-red-400 text-text after:absolute after:h-6 after:w-6 after:animate-spin after:bg-foam after:content-[""];
	}
</style>
