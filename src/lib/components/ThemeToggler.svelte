<script lang="ts">
	import { browser } from '$app/environment';
	import { capitalizeFirstLetterOfWord } from '$lib/utils';

	const themes = ['dawn', 'twilight', 'dusk'] as const;
	type SiteTheme = (typeof themes)[number];

	let siteTheme: SiteTheme;

	function handleSiteThemeChange(e: Event) {
		const target = e.target as HTMLSelectElement;
		const themeValue = target.value;

		switch (themeValue) {
			case 'dawn':
				document.documentElement.setAttribute('data-theme', 'dawn');
				localStorage.setItem('vitaneri:theme', 'dawn');
				break;
			case 'twilight':
				document.documentElement.setAttribute('data-theme', 'twilight');
				localStorage.setItem('vitaneri:theme', 'twilight');
				break;
			case 'dusk':
				document.documentElement.setAttribute('data-theme', 'dusk');
				localStorage.setItem('vitaneri:theme', 'dusk');
				break;
		}
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
	<select id="site-theme" value={siteTheme} on:change={handleSiteThemeChange}>
		{#each themes as theme}
			<option value={theme}>{capitalizeFirstLetterOfWord(theme)}</option>
		{/each}
	</select>
{/if}
