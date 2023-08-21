import { createSignal, onMount } from "solid-js";

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

	return <button onClick={toggleTheme}>{theme() ? theme() : "haha"}</button>;
}
