export function paginate<T>(
	data: Array<T>,
	{ page = 1, limit }: { page?: number; limit?: number } = {}
) {
	if (limit) {
		return data.slice((page - 1) * limit, page * limit);
	}

	return data;
}
