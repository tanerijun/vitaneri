<script lang="ts">
	import { browser } from '$app/environment';

	const themes = ['light', 'moon', 'dark'] as const;
	type SiteTheme = (typeof themes)[number];

	let siteTheme: SiteTheme;

	$: {
		switch (siteTheme) {
			case 'light':
				document.documentElement.setAttribute('data-theme', 'light');
				localStorage.setItem('vitaneri:theme', 'light');
				break;
			case 'moon':
				document.documentElement.setAttribute('data-theme', 'moon');
				localStorage.setItem('vitaneri:theme', 'moon');
				break;
			case 'dark':
				document.documentElement.setAttribute('data-theme', 'dark');
				localStorage.setItem('vitaneri:theme', 'dark');
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
			siteTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
		}
	}

	function formatOption(option: string) {
		if (option.length >= 3) {
			return option[0].toUpperCase() + option.slice(1);
		}
	}
</script>

{#if siteTheme}
	<select id="site-theme" bind:value={siteTheme}>
		{#each themes as theme}
			<option value={theme}>{formatOption(theme)}</option>
		{/each}
	</select>
{/if}
