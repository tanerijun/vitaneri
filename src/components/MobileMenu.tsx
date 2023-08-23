import { For } from "solid-js";
import { Dialog } from "@kobalte/core";
import CloseIcon from "./icons/CloseIcon";
import MenuIcon from "./icons/MenuIcon";
import { siteInfo } from "../data/site-info";

export default function MobileMenu() {
	return (
		<Dialog.Root>
			<Dialog.Trigger class="md:hidden">
				<MenuIcon class="h-6 w-6 text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100" />
			</Dialog.Trigger>
			<Dialog.Portal>
				<Dialog.Overlay class="animate-fade-out ui-expanded:animate-fade-in fixed inset-0 z-50 bg-white/60 backdrop-blur-sm dark:bg-black/60" />
				<div class="fixed inset-0 z-50 flex items-center justify-center">
					<Dialog.Content class="animate-scale-out ui-expanded:animate-scale-in z-50 h-full w-full px-16 py-24">
						<div class="flex h-full flex-col items-center">
							<Dialog.CloseButton class="self-end">
								<CloseIcon class="h-10 w-10" />
							</Dialog.CloseButton>
							<nav class="flex h-full w-full flex-col justify-center gap-10">
								<a href="/" class="text-3xl">
									Home
								</a>
								<For each={siteInfo.navLinks}>
									{(nav) => (
										<a href={nav.url} class="text-3xl">
											{nav.displayText}
										</a>
									)}
								</For>
							</nav>
						</div>
					</Dialog.Content>
				</div>
			</Dialog.Portal>
		</Dialog.Root>
	);
}
