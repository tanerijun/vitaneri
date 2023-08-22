import { createSignal, onMount } from "solid-js";
import styles from "./ThemeToggle.module.css";

type Theme = "light" | "dark";

export default function SolidButton() {
	const [theme, setTheme] = createSignal<Theme | undefined>(undefined);

	onMount(() => {
		setTheme(document.documentElement.className as Theme);
	});

	function disableTransitionsTemporarily() {
		document.documentElement.classList.add("[&_*]:!transition-none");
		window.setTimeout(() => {
			document.documentElement.classList.remove("[&_*]:!transition-none");
		}, 0);
	}

	function toggleTheme() {
		const nextTheme = theme() === "light" ? "dark" : "light";
		localStorage.setItem("theme", nextTheme);
		document.documentElement.className = nextTheme;
		disableTransitionsTemporarily();
		setTheme(nextTheme);
	}

	return (
		<button
			class={`${styles.toggle} ${theme() === "light" ? styles["toggle-dark"] : styles["toggle-light"]}`}
			onClick={toggleTheme}
			aria-label={`switch to ${theme() === "light" ? "dark" : "light"} mode`}
		/>
	);
}