<script lang="ts">
	import { page } from '$app/stores';
	import { capitalizeFirstLetterOfWord } from '$lib/utils';
	import { onMount } from 'svelte';

	let routes = ['posts', 'projects', 'about'];

	let marker: HTMLDivElement;
	let activeLink: HTMLElement;

	$: if (activeLink) updateMarkerPosition(activeLink);

	onMount(() => {
		const link = $page.url.pathname.split('/')[1];
		const linkElement = document.getElementById(link);
		if (linkElement) activeLink = linkElement;
	});

	function updateMarkerPosition(elem: HTMLElement) {
		marker.style.left = activeLink.offsetLeft + 'px';
		marker.style.width = activeLink.offsetWidth + 'px';
	}

	function handleLinkClick(e: Event) {
		const target = e.target as HTMLElement;
		activeLink = target;
	}
</script>

<div
	id="marker"
	bind:this={marker}
	class="absolute top-6 left-0 h-0.5 w-0 rounded-full bg-iris transition-all"
/>
{#each routes as route (route)}
	<li>
		<!-- id attribute is necessary for marker to work -->
		<a
			id={`${route}`}
			class:text-text={$page.url.pathname.includes(route)}
			class="relative hover:text-text"
			href={`/${route}`}
			on:click={handleLinkClick}
		>
			{capitalizeFirstLetterOfWord(route)}
		</a>
	</li>
{/each}
