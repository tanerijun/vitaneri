<script lang="ts">
	import { browser } from '$app/environment';
	import AnimatedMoon from '$lib/components/icons/AnimatedMoon.svelte';
	import AnimatedMoonAlt from '$lib/components/icons/AnimatedMoonAlt.svelte';
	import AnimatedSun from '$lib/components/icons/AnimatedSun.svelte';

	const themes = ['dawn', 'twilight', 'dusk'] as const;
	type SiteTheme = (typeof themes)[number];

	let siteTheme: SiteTheme;
	$: currentThemeIndex = themes.findIndex((theme) => theme === siteTheme);

	function handleSiteThemeChange() {
		const nextTheme =
			currentThemeIndex === themes.length - 1 ? themes[0] : themes[currentThemeIndex + 1];

		changeTheme(nextTheme);
	}

	function changeTheme(theme: SiteTheme) {
		document.documentElement.setAttribute('data-theme', theme);
		localStorage.setItem('vitaneri:theme', theme);
		siteTheme = theme;
	}

	if (browser) {
		// If a valid theme data set by the inline script in <head> is available
		const dataTheme = document.documentElement.getAttribute('data-theme');
		if (typeof dataTheme === 'string' && themes.includes(dataTheme as SiteTheme)) {
			siteTheme = dataTheme as SiteTheme;
		} else {
			// Use user's preferred color scheme
			siteTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dusk' : 'dawn';
		}
	}
</script>

{#if siteTheme}
	<button
		on:click={handleSiteThemeChange}
		class=" flex items-center justify-center border border-blue-400 transition-colors hover:text-text"
	>
		{#if siteTheme === 'dawn'}
			<AnimatedSun size={24} />
		{:else if siteTheme === 'twilight'}
			<AnimatedMoonAlt size={24} />
		{:else}
			<AnimatedMoon size={24} />
		{/if}
	</button>
{/if}
