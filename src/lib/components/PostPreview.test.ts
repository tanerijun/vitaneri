import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/svelte';

import PostPreviewTest from './test-components/PostPreviewTest.svelte';
import { mockPostData } from '$lib/test-utils/mockPostData';

describe('PostPreview', () => {
	it('should render post info properly', () => {
		render(PostPreviewTest);

		expect(screen.getByText(mockPostData.title)).toBeInTheDocument();
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		expect(screen.getByText(mockPostData.preview.text!)).toBeInTheDocument();
		expect(screen.getByText(/read/i)).toBeInTheDocument();
	});

	it('should render actions slot', () => {
		render(PostPreviewTest);
		expect(document.querySelector(`div[slot="actions"]`)).toBeInTheDocument();
	});

	it('should render eyebrow slot', () => {
		render(PostPreviewTest);
		expect(screen.getByText(/Hello from PostPreview's eyebrow/i)).toBeInTheDocument();
	});
});
