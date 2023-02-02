<script lang="ts">
	import NavLinks from './Navbar/NavLinks.svelte';
	import SiteLogo from './Navbar/SiteLogo.svelte';
	import ThemeToggler from './Navbar/ThemeToggler.svelte';
</script>

<div class="flex items-center justify-between border border-love py-4">
	<SiteLogo />
	<nav>
		<ul class="flex space-x-4 border border-teal-100">
			<NavLinks />
			<li>
				<ThemeToggler />
			</li>
			<li>Search Icon</li>
		</ul>
	</nav>
</div>
