import { prefetch } from "astro:prefetch";
import { For } from "solid-js";
import { siteInfo } from "../data/site-info";

function prefetchNavLinks() {
	for (const navLink of siteInfo.navLinks) {
		prefetch(navLink.url);
	}

	prefetch("/");
}

export default function MobileMenu() {
	let dialog: HTMLDialogElement;

	return (
		<>
			<button
				onClick={() => {
					dialog.showModal();
					prefetchNavLinks();
				}}
				class="rounded-md p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 md:hidden"
				aria-label="menu"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="1em"
					height="1em"
					viewBox="0 0 24 24"
					class="h-6 w-6 text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
				>
					<path fill="currentColor" d="M3 4h18v2H3V4Zm0 7h18v2H3v-2Zm0 7h18v2H3v-2Z" />
				</svg>
			</button>
			{/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */}
			<dialog
				ref={dialog!}
				onClick={() => dialog.close()}
				class="w-3/4 bg-transparent backdrop:bg-white/70 backdrop:backdrop-blur-md backdrop:dark:bg-black/70"
			>
				<div class="flex flex-col gap-12 p-4">
					<button onClick={() => dialog.close()} class="self-end">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="1em"
							height="1em"
							viewBox="0 0 24 24"
							class="h-10 w-10 text-zinc-700 transition-colors hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100"
						>
							<path
								fill="currentColor"
								d="m12 10.586l4.95-4.95l1.415 1.415l-4.95 4.95l4.95 4.95l-1.415 1.414l-4.95-4.95l-4.95 4.95l-1.413-1.415l4.95-4.95l-4.95-4.95L7.05 5.638l4.95 4.95Z"
							/>
						</svg>
					</button>

					<div class="flex flex-col gap-10">
						<a href="/" class="text-3xl text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100">
							Home
						</a>
						<For each={siteInfo.navLinks}>
							{(navLink) => (
								<a
									href={navLink.url}
									class="text-3xl text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100"
								>
									{navLink.displayText}
								</a>
							)}
						</For>
					</div>
				</div>
			</dialog>
		</>
	);
}
