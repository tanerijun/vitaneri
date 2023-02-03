<script lang="ts">
	import SiteLogo from './SiteLogo.svelte';
	import NavbarLinks from './NavbarLinks.svelte';
	import ThemeToggler from './ThemeToggler.svelte';
	import Search from './Search.svelte';
	import MobileMenu from './MobileMenu.svelte';

	let showMobileNavigation = false;

	function handleMenuChange(event: CustomEvent<{ isOpen: boolean }>) {
		showMobileNavigation = event.detail.isOpen;
	}
</script>

<header class="mb-8">
	<!-- Skip To Content -->
	<!-- Normally hidden, useful for screen reader or keyboard user -->
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
		<div class="flex space-x-6">
			<!-- Navigation component for wide screen -->
			<!-- position: relative is necessary for the marker in NavLinks -->
			{#if !showMobileNavigation}
				<nav class="relative hidden items-center space-x-6 md:flex">
					<NavbarLinks />
				</nav>
			{/if}

			<div class="flex items-center space-x-3">
				<ThemeToggler />
				<Search />
				<MobileMenu class="md:hidden" on:change={handleMenuChange} />
			</div>
		</div>
	</div>
	<!-- Navigation component for mobile -->
	{#if showMobileNavigation}
		<nav class="relative flex items-center justify-center space-x-6 md:hidden">
			<NavbarLinks isMobile />
		</nav>
	{/if}
</header>
