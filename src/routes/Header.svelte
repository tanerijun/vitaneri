<script>
	import SiteLogo from './SiteLogo.svelte';
	import NavbarLinks from './NavbarLinks.svelte';
	import ThemeToggler from './ThemeToggler.svelte';
	import Search from './Search.svelte';
</script>

<header class="mb-8">
	<!-- Skip To Content -->
	<a
		id="skip-to-content"
		href="#main-content"
		class="top absolute -top-full left-16 z-50 bg-overlay p-2 text-text transition-all focus:top-4 focus:ring"
	>
		Skip to content
	</a>

	<!-- Navbar -->
	<div class="flex items-center justify-between py-6">
		<SiteLogo />
		<nav>
			<!-- position: relative is necessary for the marker in NavLinks -->
			<ul class="relative flex items-center justify-start space-x-6">
				<NavbarLinks />
				<li>
					<div class="flex items-center space-x-3">
						<ThemeToggler />
						<Search />
					</div>
				</li>
			</ul>
		</nav>
	</div>
</header>
