import type { JSX } from "solid-js";

export default function CrossIcon(props: JSX.IntrinsicElements["svg"]) {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
			<path
				fill="currentColor"
				d="m12 10.586l4.95-4.95l1.415 1.415l-4.95 4.95l4.95 4.95l-1.415 1.414l-4.95-4.95l-4.95 4.95l-1.413-1.415l4.95-4.95l-4.95-4.95L7.05 5.638l4.95 4.95Z"
			/>
		</svg>
	);
}
