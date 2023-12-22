import { For, Match, Switch, createSignal, onMount } from "solid-js";
import { siteInfo } from "../data/site-info";

type Book = {
	title: string;
	url: string;
};

function LoadingIndicator() {
	return (
		<div role="status" class="flex animate-pulse flex-col">
			<span class="sr-only">Loading...</span>
			<div class="mb-4 h-3 w-full rounded-full bg-zinc-200 md:w-3/4 dark:bg-zinc-700" />
			<div class="mb-4 h-3 w-full rounded-full bg-zinc-200 dark:bg-zinc-700" />
			<div class="mb-4 h-3 w-full rounded-full bg-zinc-200 md:w-1/2 dark:bg-zinc-700" />
			<div class="mb-4 h-3 w-full rounded-full bg-zinc-200 md:w-2/3 dark:bg-zinc-700" />
			<div class="mb-4 h-3 w-full rounded-full bg-zinc-200 dark:bg-zinc-700" />
		</div>
	);
}

export default function CurrentlyReading() {
	const [books, setBooks] = createSignal<Array<Book> | undefined>(undefined);

	onMount(async () => {
		const cachedBooks = sessionStorage.getItem("books");
		if (cachedBooks) {
			const parsedBooks = JSON.parse(cachedBooks) as unknown as Array<Book>;
			setBooks(parsedBooks);
			return;
		}

		const response = await fetch(siteInfo.currentlyReading);
		if (!response.ok) {
			setBooks([]);
			return;
		}

		const result = (await response.json()) as unknown as Array<Book>;
		sessionStorage.setItem("books", JSON.stringify(result));
		setBooks(result);
	});

	return (
		<Switch fallback={<LoadingIndicator />}>
			<Match when={!books()?.length}>
				<p>Seems like I'm not reading anything at the moment.</p>
			</Match>
			<Match when={books()?.length}>
				<ul class="list-disc text-zinc-700 marker:text-zinc-300 has-[li:hover]:text-zinc-400 dark:text-zinc-300 dark:marker:text-zinc-600 dark:has-[li:hover]:text-zinc-500">
					<For each={books()}>
						{(book) => (
							<li class="ml-6 max-w-fit">
								<a
									href={book.url}
									class="flex max-w-fit items-start gap-4 py-1 pl-2 transition-colors duration-200 hover:text-zinc-950 dark:hover:text-white"
									target="_blank"
									rel="norereffer"
								>
									{book.title}
								</a>
							</li>
						)}
					</For>
				</ul>
			</Match>
		</Switch>
	);
}
