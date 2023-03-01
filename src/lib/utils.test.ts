// @vitest-environment node
import { paginate, capitalizeFirstLetterOfWord, zeroPad } from './utils';

describe('paginate', () => {
	it('should return the same data when limit is not passed', () => {
		expect(paginate([1, 2, 3])).toEqual([1, 2, 3]);
	});

	it('should return paginated data when passed page and limit', () => {
		expect(paginate([1, 2, 3, 4, 5, 6, 7, 8, 9], { page: 1, limit: 3 })).toEqual([1, 2, 3]);
		expect(paginate([1, 2, 3, 4, 5, 6, 7, 8, 9], { page: 2, limit: 3 })).toEqual([4, 5, 6]);
		expect(paginate([1, 2, 3, 4, 5, 6, 7, 8, 9], { page: 3, limit: 3 })).toEqual([7, 8, 9]);
	});
});

describe('capitalizeFirstLetterOfWord', () => {
	it('should capitalize the first letter of a word', () => {
		expect(capitalizeFirstLetterOfWord('hello')).toBe('Hello');
	});
});

describe('zeroPad', () => {
	it('should zero pad a number', () => {
		expect(zeroPad(1, 3)).toBe('001');
		expect(zeroPad(10, 3)).toBe('010');
	});
});
