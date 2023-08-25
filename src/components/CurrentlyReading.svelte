<script lang="ts">
	import { onMount } from "svelte";
	import { siteInfo } from "../data/site-info";

	type Book = {
		title: string;
		url: string;
	};

	let books: Array<Book> | undefined = undefined;

	async function fetchBooks() {
		const cachedBooks = sessionStorage.getItem("books");
		if (cachedBooks) {
			books = JSON.parse(cachedBooks) as unknown as Array<Book>;
			return;
		}

		const response = await fetch(siteInfo.currentlyReading);
		if (!response.ok) {
			books = [];
			return;
		}

		const result = await response.json();
		sessionStorage.setItem("books", JSON.stringify(result));
		books = result as unknown as Array<Book>;
	}

	onMount(async () => {
		await fetchBooks();
	});
</script>

{#if !books}
	<div role="status" class="flex animate-pulse flex-col">
		<span class="sr-only">Loading...</span>
		<div class="mb-4 h-3 w-full rounded-full bg-zinc-200 dark:bg-zinc-700 md:w-3/4"></div>
		<div class="mb-4 h-3 w-full rounded-full bg-zinc-200 dark:bg-zinc-700"></div>
		<div class="mb-4 h-3 w-full rounded-full bg-zinc-200 dark:bg-zinc-700 md:w-1/2"></div>
		<div class="mb-4 h-3 w-full rounded-full bg-zinc-200 dark:bg-zinc-700 md:w-2/3"></div>
		<div class="mb-4 h-3 w-full rounded-full bg-zinc-200 dark:bg-zinc-700"></div>
	</div>
{:else if books.length === 0}
	<p>Seems like I'm not reading anything at the moment.</p>
{:else}
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
{/if}
