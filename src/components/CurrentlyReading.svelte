<script lang="ts">
	import { siteInfo } from "../data/site-info";

	type Book = {
		title: string;
		url: string;
	};

	async function getCurrentlyReading(): Promise<Array<Book>> {
		const response = await fetch(siteInfo.currentlyReading);
		if (!response.ok) {
			throw new Error(response.status + " " + response.statusText);
		}

		return await response.json();
	}

	let promise = getCurrentlyReading();
</script>

{#await promise}
	<div role="status" class="flex animate-pulse flex-col">
		<span class="sr-only">Loading...</span>
		<div class="mb-4 h-3 w-full rounded-full bg-zinc-200 dark:bg-zinc-700 md:w-3/4"></div>
		<div class="mb-4 h-3 w-full rounded-full bg-zinc-200 dark:bg-zinc-700"></div>
		<div class="mb-4 h-3 w-full rounded-full bg-zinc-200 dark:bg-zinc-700 md:w-1/2"></div>
		<div class="mb-4 h-3 w-full rounded-full bg-zinc-200 dark:bg-zinc-700 md:w-2/3"></div>
		<div class="mb-4 h-3 w-full rounded-full bg-zinc-200 dark:bg-zinc-700"></div>
	</div>
{:then books}
	<ul class="group">
		{#each books as book (book.url)}
			<li>
				<a
					href={book.url}
					class="text-zinc-700 no-underline group-hover:text-zinc-400 dark:text-zinc-300 group-hover:dark:text-zinc-600"
					target="_blank"
					rel="norereffer"
				>
					<span class="transition-colors hover:text-zinc-900 dark:hover:text-zinc-100">{book.title}</span>
				</a>
			</li>
		{/each}
	</ul>
{:catch}
	<p>Seems like I'm not reading anything at the moment.</p>
{/await}
