<!-- @component
  Script to run on page load to prevent screen flickering from theme change on first site visit
-->
<svelte:head>
	<script>
		let dataTheme = localStorage.getItem('vitaneri:theme');
		if (!dataTheme) {
			dataTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dusk' : 'dawn';
		}
		document.documentElement.setAttribute('data-theme', dataTheme);
	</script>
</svelte:head>
