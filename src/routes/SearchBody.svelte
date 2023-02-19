<script lang="ts">
	import { browser } from '$app/environment';
	import { search } from '@lyrasearch/lyra';

	export let query: string;
	let searchDB: any;
	let results: any;

	$: console.log(results);

	$: if (query && searchDB) {
		search(searchDB, {
			term: query,
			properties: ['title', 'preview', 'tags']
		}).then((data) => {
			results = data;
		});
	}

	async function fetchSearchDB() {
		const response = await fetch('/searchdb.json', {
			headers: {
				Accept: 'application/json'
			}
		});
		const data = await response.json();
		return data;
	}

	if (browser) {
		const sessionStorageSearchDB = window.sessionStorage.getItem('searchDB');
		if (sessionStorageSearchDB) {
			searchDB = JSON.parse(sessionStorageSearchDB);
		} else {
			fetchSearchDB().then((data) => {
				searchDB = data;
				window.sessionStorage.setItem('searchDB', JSON.stringify(data));
			});
		}
	}
</script>

{#if searchDB}
	<div>{searchDB.docsCount}</div>
{/if}
