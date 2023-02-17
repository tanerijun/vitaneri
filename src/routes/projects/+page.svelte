<script lang="ts">
	import { page } from '$app/stores';
	import PageMeta from '$lib/components/PageMeta.svelte';
	import { projects } from './projects';
</script>

<PageMeta
	title="Projects | Vitaneri"
	description="Personal projects by Vincent Taneri"
	route={$page.url.pathname}
/>

<section class="flex flex-col space-y-16">
	<header>
		<h1 class="text-4xl font-bold tracking-tight sm:text-5xl">Side Projects</h1>
		<p class="mt-6">These are some of my side projects that I think are worth sharing:</p>
	</header>

	<div class="md:columns-2">
		{#each projects as project (project.title)}
			<div class="mb-4 break-inside-avoid-column border border-muted/50">
				<img src={project.imgUrl} alt={project.title} />
				<div class="flex flex-col space-y-4 p-4">
					<h2 class="text-2xl">{project.title}</h2>
					<p>{project.description}</p>
					<div class="columns-2 text-sm">
						{#each project.techs as tech (tech)}
							<div><span class="mr-2 text-iris">#</span>{tech}</div>
						{/each}
					</div>
					<div>
						<a
							href={project.url}
							class="hover-underline-animation text-iris"
							target="_blank"
							rel="noreferrer"
						>
							Live
						</a>
						•
						<a
							href={project.repo}
							class="hover-underline-animation text-iris"
							target="_blank"
							rel="noreferrer"
						>
							Repo
						</a>
					</div>
				</div>
			</div>
		{/each}
	</div>

	<footer>
		<p>
			You can check out more side projects on my
			<a
				href="https://github.com/tanerijun"
				target="_blank"
				rel="noreferrer"
				class="hover-underline-animation text-iris"
			>
				Github
			</a>
			.
		</p>
	</footer>
</section>
