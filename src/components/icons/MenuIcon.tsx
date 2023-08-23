import type { JSX } from "solid-js";

export default function MenuIcon(props: JSX.IntrinsicElements["svg"]) {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
			<path fill="currentColor" d="M3 4h18v2H3V4Zm0 7h18v2H3v-2Zm0 7h18v2H3v-2Z" />
		</svg>
	);
}
