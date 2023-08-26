<script lang="ts">
	import { onMount } from "svelte";

	type Theme = "light" | "dark";

	let theme: Theme | undefined;

	onMount(() => {
		theme = document.documentElement.className as Theme;
	});

	function toggleTheme() {
		const nextTheme = theme === "light" ? "dark" : "light";
		localStorage.setItem("theme", nextTheme);
		document.documentElement.className = nextTheme;
		disableTransitionsTemporarily();
		theme = nextTheme;
	}

	function disableTransitionsTemporarily() {
		document.documentElement.classList.add("[&_*]:!transition-none");
		window.setTimeout(() => {
			document.documentElement.classList.remove("[&_*]:!transition-none");
		}, 0);
	}
</script>

<button
	class="rounded-full p-1 text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
	on:click={toggleTheme}
	aria-label="theme-toggle"
>
	<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512" class="h-6 w-6">
		<path
			fill="currentColor"
			d="M8 256c0 136.966 111.033 248 248 248s248-111.034 248-248S392.966 8 256 8S8 119.033 8 256zm248 184V72c101.705 0 184 82.311 184 184c0 101.705-82.311 184-184 184z"
		/>
	</svg>
</button>
