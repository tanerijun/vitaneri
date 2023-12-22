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
				<ul class="group">
					<For each={books()}>
						{(book) => (
							<li>
								<a
									href={book.url}
									class="text-zinc-700 no-underline transition-colors group-hover:text-zinc-400 dark:text-zinc-300 group-hover:dark:text-zinc-600"
									target="_blank"
									rel="norereffer"
								>
									<span class="transition-colors hover:text-zinc-900 dark:hover:text-zinc-100">{book.title}</span>
								</a>
							</li>
						)}
					</For>
				</ul>
			</Match>
		</Switch>
	);
}
