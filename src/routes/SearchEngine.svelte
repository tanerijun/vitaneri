<script lang="ts">
	import uFuzzy from '@leeoniya/ufuzzy';

	export let query: string = '';
	export let data: { [key: string]: any }[] = [];
	export let result: Array<(typeof data)[0] & { highlight: string }> = [];

	const uf = new uFuzzy({
		intraMode: 1, // IntraMode.SingleError
		intraIns: 1,
		intraSub: 1,
		intraTrn: 1,
		intraDel: 1
	});

	$: if (query || data) {
		const haystack = data.map((item) => item.title);
		const [idxs, info, order] = uf.search(haystack, query, true, 1e3);
		if (idxs && info && order) {
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
		}
	}
</script>
