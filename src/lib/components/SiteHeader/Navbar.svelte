<script lang="ts">
	import NavLinks from './Navbar/NavLinks.svelte';
	import Search from './Navbar/Search.svelte';
	import SiteLogo from './Navbar/SiteLogo.svelte';
	import ThemeToggler from './Navbar/ThemeToggler.svelte';
</script>

<div class="flex items-center justify-between py-4">
	<SiteLogo />
	<nav>
		<!-- position: relative is necessary for the marker in NavLinks -->
		<ul class="relative flex items-center justify-start space-x-6">
			<NavLinks />
			<li>
				<div class="flex items-center space-x-2">
					<ThemeToggler />
					<Search />
				</div>
			</li>
		</ul>
	</nav>
</div>
