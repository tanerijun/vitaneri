import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/svelte';

import PostDate from './PostDate.svelte';
import { mockPostData } from '$lib/test-utils/mockPostData';

describe('PostDate', () => {
	it('should render date properly', () => {
		render(PostDate, {
			props: { post: mockPostData, class: 'test-class' }
		});
		expect(screen.getByText('January 1, 2021')).toBeInTheDocument();
	});

	it('should render a time tag with datetime attribute', () => {
		render(PostDate, {
			props: { post: mockPostData, class: 'test-class' }
		});
		expect(document.querySelector('time')).toHaveAttribute('datetime', '2021-01-01');
	});

	it('should pass along custom classes', () => {
		render(PostDate, {
			props: { post: mockPostData, class: 'test-class' }
		});
		expect(screen.getByTestId('post-date')).toHaveClass('test-class');
	});

	it('should show a decoration when passed the decorate prop', () => {
		render(PostDate, {
			props: { post: mockPostData, class: 'test-class', decorate: true }
		});
		expect(screen.getByTestId('decoration')).toBeInTheDocument();
	});

	it('should show a separator when passed the collapsed prop', () => {
		render(PostDate, {
			props: { post: mockPostData, class: 'test-class', collapsed: true }
		});
		expect(screen.getByTestId('separator')).toBeInTheDocument();
	});
});
