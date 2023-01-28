<script lang="ts">
	import { browser } from '$app/environment';

	let darkTheme = true;

	function handleClick() {
		darkTheme = !darkTheme;

		if (darkTheme) {
			document.documentElement.classList.remove('light');
			document.documentElement.classList.add('dark');
			localStorage.setItem('vitaneri:theme', 'dark');
		} else {
			document.documentElement.classList.remove('dark');
			document.documentElement.classList.add('light');
			localStorage.setItem('vitaneri:theme', 'light');
		}
	}

	// if (browser) {
	// 	if (
	// 		localStorage.theme === 'dark' ||
	// 		(!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
	// 	) {
	// 		document.documentElement.classList.add('dark');
	// 		darkMode = true;
	// 	} else {
	// 		document.documentElement.classList.remove('dark');
	// 		darkMode = false;
	// 	}
	// }
</script>

<div>
	<input type="checkbox" id="theme-toggle" on:click={handleClick} />
	<label for="theme-toggle" />
</div>

<!-- <button
	class="theme-toggler"
	id="theme-toggler"
	title="Toggles light & dark"
	aria-label="auto"
	aria-live="polite"
>
	<svg class="sun-and-moon" aria-hidden="true" width="24" height="24" viewBox="0 0 24 24">
		<circle class="sun" cx="12" cy="12" r="6" mask="url(#moon-mask)" fill="currentColor" />
		<g class="sun-beams" stroke="currentColor">
			<line x1="12" y1="1" x2="12" y2="3" />
			<line x1="12" y1="21" x2="12" y2="23" />
			<line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
			<line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
			<line x1="1" y1="12" x2="3" y2="12" />
			<line x1="21" y1="12" x2="23" y2="12" />
			<line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
			<line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
		</g>
		<mask class="moon" id="moon-mask">
			<rect x="0" y="0" width="100%" height="100%" fill="white" />
			<circle cx="24" cy="10" r="6" fill="black" />
		</mask>
	</svg>
</button>

<style>
	.theme-toggler {
		--size: 2rem;

		background: none;
		border: none;
		padding: 0;

		inline-size: var(--size);
		block-size: var(--size);
		aspect-ratio: 1;
		border-radius: 50%;

		cursor: pointer;
		touch-action: manipulation;
		-webkit-tap-highlight-color: transparent;
		outline-offset: 5px;
	}

	.sun-and-moon {
		inline-size: 100%;
		block-size: 100%;
		stroke-linecap: round;
	}
</style> -->
<style lang="postcss">
	#theme-toggle {
		@apply invisible;
	}

	#theme-toggle + label {
		@apply absolute top-6 right-24 inline-block h-12 w-12 cursor-pointer rounded-full duration-300 content-[''];
	}

	#theme-toggle:not(:checked) + label {
		@apply bg-amber-400;
	}

	#theme-toggle:checked + label {
		@apply bg-transparent;
		box-shadow: inset -18px -16px 1px 1px #ddd;
	}
</style>
