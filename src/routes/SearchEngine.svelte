<script lang="ts">
	import uFuzzy from '@leeoniya/ufuzzy';

	export let query: string = '';
	export let data: { [key: string]: any }[] = [];
	export let result: Object[] = [];

	const uf = new uFuzzy({
		intraMode: 1
	});

	$: if (query || data) {
		const haystack = data.map((item) => item.title);
		const idxs = uf.filter(haystack, query);
		const info = uf.info(idxs, haystack, query);
		const order = uf.sort(info, haystack, query);
		result = order.map((idx) => {
			const itemIdx = info.idx[order[idx]];
			const item = data[itemIdx];
			const highlight = uFuzzy.highlight(
				haystack[itemIdx],
				info.ranges[order[idx]],
				(part, matched) => (matched ? '<mark>' + part + '</mark>' : part)
			);
			return { ...item, highlight };
		});
		console.log('data: ', data);
		console.log('haystack: ', haystack);
		console.log('idxs: ', idxs);
		console.log('info: ', info);
		console.log('order: ', order);
		console.log('result', result);
	}
</script>
