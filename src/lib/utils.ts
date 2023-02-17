export function paginate<T>(
	data: Array<T>,
	{ page = 1, limit }: { page?: number; limit?: number } = {}
) {
	if (limit) {
		return data.slice((page - 1) * limit, page * limit);
	}

	return data;
}

export function capitalizeFirstLetterOfWord(word: string) {
	return word.charAt(0).toUpperCase() + word.slice(1);
}

export function zeroPad(num: number, places: number) {
	return String(num).padStart(places, '0');
}
