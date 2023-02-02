<script lang="ts">
	import { page } from '$app/stores';
	import { capitalizeFirstLetterOfWord } from '$lib/utils';

	let routes = ['posts', 'projects', 'about'];
</script>

{#each routes as route (route)}
	<li>
		<a
			class:text-text={$page.url.pathname.includes(route)}
			class:active={$page.url.pathname.includes(route)}
			class="relative hover:text-text"
			href={`/${route}`}
		>
			{capitalizeFirstLetterOfWord(route)}
		</a>
	</li>
{/each}

<style lang="postcss">
	/* .active::before { */
	/* content: '';
		position: absolute;
		background: #fff;
		height: 4px;
		width: 10px;
		bottom: -8px;
		transition: 3s;
		border-radius: 4px; */
	/* content: '';
		position: absolute;
		width: 15px;
		height: 15px;
		-moz-border-radius: 7.5px;
		-webkit-border-radius: 7.5px;
		border-radius: 7.5px;
		background-color: #69b6d5;
	} */
	.active {
		@apply bg-red-400 text-text after:absolute after:h-6 after:w-6 after:animate-spin after:bg-foam after:content-[""];
	}
</style>
