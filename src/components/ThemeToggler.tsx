import { Match, Switch, createSignal, onMount } from "solid-js";
import MoonIcon from "./icons/MoonIcon";
import SunIcon from "./icons/SunIcon";

type Theme = "light" | "dark";

export default function SolidButton() {
	const [theme, setTheme] = createSignal<Theme | undefined>(undefined);

	onMount(() => {
		setTheme(document.documentElement.className as Theme);
	});

	function toggleTheme() {
		const nextTheme = theme() === "light" ? "dark" : "light";
		localStorage.setItem("theme", nextTheme);
		document.documentElement.className = nextTheme;
		setTheme(nextTheme);
	}

	return (
		<button onClick={toggleTheme} class="text-zinc-400 transition-colors hover:text-zinc-900">
			<Switch fallback={<SunIcon class="h-5 w-5" />}>
				<Match when={theme() === "light"}>
					<SunIcon class="h-5 w-5" />
				</Match>
				<Match when={theme() === "dark"}>
					<MoonIcon class="h-5 w-5" />
				</Match>
			</Switch>
		</button>
	);
}
