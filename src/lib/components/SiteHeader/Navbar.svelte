<script lang="ts">
	import NavLinks from './Navbar/NavLinks.svelte';
	import SiteLogo from './Navbar/SiteLogo.svelte';
	import ThemeToggler from './Navbar/ThemeToggler.svelte';
</script>

<div class="flex items-center justify-between border border-love py-4">
	<SiteLogo />
	<nav>
		<!-- position: relative is necessary for the marker in NavLinks -->
		<ul class="relative flex space-x-8">
			<NavLinks />
			<li>
				<ThemeToggler />
			</li>
			<li>Search Icon</li>
		</ul>
	</nav>
</div>
