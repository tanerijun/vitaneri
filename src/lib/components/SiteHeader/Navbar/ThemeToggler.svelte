<script lang="ts">
	import { browser } from '$app/environment';

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
	<button on:click={handleSiteThemeChange}>{siteTheme}</button>
{/if}
