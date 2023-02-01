<script lang="ts">
	export let title: string;
	export let description: string | undefined;
	export let route: string;

	if (!description) {
		description = title;
	}

	// Ignore the last character if it's a (slash (/)), happens when the page is site root
	let url = 'https://vitaneri.com' + route;
	if (url.endsWith('/')) {
		url = url.slice(0, url.length - 1);
	}
</script>

<!-- 
  @component Handles SEO meta tags like title, description, author, Open Graph, and Twitter  
  
  Note: route prop should be the value of `$page.url.pathname`
-->
<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta name="author" content="Vincent Taneri" />

	<!-- Open Graph / Facebook -->
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={url} />
	<meta property="og:image" content="https://vitaneri.com/vitaneri-og.png" />

	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content={url} />
	<meta property="twitter:title" content={title} />
	<meta property="twitter:description" content={description} />
	<meta property="twitter:image" content="https://vitaneri.com/vitaneri-og.png" />
</svelte:head>
