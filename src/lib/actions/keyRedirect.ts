// Redirect focus to node when a word character is pressed
export function keyRedirect(node: HTMLElement) {
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
