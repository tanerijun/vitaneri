<script lang="ts">
	export let size: number = 18;
</script>

<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24"
	><g
		fill="none"
		stroke="currentColor"
		stroke-dasharray="24"
		stroke-dashoffset="24"
		stroke-linecap="round"
		stroke-width="2"
		><path d="M5 5H19"
			><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.2s" values="24;0" /></path
		><path d="M5 12H19"
			><animate
				fill="freeze"
				attributeName="stroke-dashoffset"
				begin="0.2s"
				dur="0.2s"
				values="24;0"
			/></path
		><path d="M5 19H19"
			><animate
				fill="freeze"
				attributeName="stroke-dashoffset"
				begin="0.4s"
				dur="0.2s"
				values="24;0"
			/></path
		></g
	></svg
>
