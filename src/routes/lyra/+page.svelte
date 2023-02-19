<script lang="ts">
	import { create, insert, search } from '@lyrasearch/lyra';
	import { onMount } from 'svelte';

	let movieDB: any;
	let query: string = '';

	async function createAndInsertToDB() {
		movieDB = await create({
			schema: {
				title: 'string',
				director: 'string',
				plot: 'string',
				year: 'number',
				isFavorite: 'boolean'
			}
		});

		await insert(movieDB, {
			title: 'The prestige',
			director: 'Christopher Nolan',
			plot: 'Two friends and fellow magicians become bitter enemies after a sudden tragedy. As they devote themselves to this rivalry, they make sacrifices that bring them fame but with terrible consequences.',
			year: 2006,
			isFavorite: true
		});

		await insert(movieDB, {
			title: 'Big Fish',
			director: 'Tim Burton',
			plot: 'Will Bloom returns home to care for his dying father, who had a penchant for telling unbelievable stories. After he passes away, Will tries to find out if his tales were really true.',
			year: 2004,
			isFavorite: true
		});

		await insert(movieDB, {
			title: "Harry Potter and the Philosopher's Stone",
			director: 'Chris Columbus',
			plot: 'Harry Potter, an eleven-year-old orphan, discovers that he is a wizard and is invited to study at Hogwarts. Even as he escapes a dreary life and enters a world of magic, he finds trouble awaiting him.',
			year: 2001,
			isFavorite: false
		});
	}

	// onMount(() => createAndInsertToDB());
	onMount(() => (movieDB = JSON.parse(window.sessionStorage.getItem('searchDB'))));

	$: if (query && movieDB) {
		console.log(movieDB);
		search(movieDB, {
			term: query,
			properties: ['title']
		}).then((data) => {
			console.log(data);
		});
	}
</script>

<div>
	<input type="text" bind:value={query} />
</div>
