<script lang="ts">
	export let query: string;

	// Redirect focus to node when a word character is pressed
	function keyRedirect(node: HTMLElement) {
		function handleKeydown(e: KeyboardEvent) {
			if (node === document.activeElement) {
				return;
			}
			if (e.code.match(/\w/g)) {
				node.focus();
			}
		}
		window.addEventListener('keydown', handleKeydown);
		return {
			destroy() {
				window.removeEventListener('keydown', handleKeydown);
			}
		};
	}
</script>

<input
	type="text"
	placeholder="Type something..."
	class="h-10 w-full rounded-md border border-muted/20 bg-basis px-4 text-sm text-text placeholder-muted focus:border-transparent focus:outline-none focus:ring-2 focus:ring-accent"
	bind:value={query}
	use:keyRedirect
/>
