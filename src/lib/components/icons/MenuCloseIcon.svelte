<script lang="ts">
	export let size: number = 18;
</script>

<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24"
	><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2"
		><path d="M5 5L12 5L19 5"
			><animate
				fill="freeze"
				attributeName="d"
				dur="0.4s"
				values="M5 5L12 5L19 5;M5 5L12 12L19 5"
			/></path
		><path d="M5 12H19"
			><animate fill="freeze" attributeName="d" dur="0.4s" values="M5 12H19;M12 12H12" /></path
		><path d="M5 19L12 19L19 19"
			><animate
				fill="freeze"
				attributeName="d"
				dur="0.4s"
				values="M5 19L12 19L19 19;M5 19L12 12L19 19"
			/></path
		></g
	></svg
>
