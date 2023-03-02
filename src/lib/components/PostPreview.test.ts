import { render, screen } from '@testing-library/svelte';
import html from 'svelte-htm';
import PostPreview from './PostPreview.svelte';
import { mockPostData } from '$lib/test-utils/mockPostData';

const post = {
	...mockPostData,
	preview: {
		text: mockPostData.description,
		html: `<p data-testid="html-preview">${mockPostData.description}</p>`
	}
};

const basicPostPreview = html`
<${PostPreview} post=${post}>
	<slot slot="eyebrow">
		<p>Hello from PostPreview's eyebrow</p>
	</slot>
</${PostPreview}>
`;

describe('PostPreview', () => {
	it('should render post info properly', () => {
		render(basicPostPreview);
		expect(screen.getByText(post.title)).toBeInTheDocument();
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		expect(screen.getByText(post.preview.text!)).toBeInTheDocument();
		expect(screen.getByText(/read/i)).toBeInTheDocument();
	});

	it('should render actions slot', () => {
		render(basicPostPreview);
		expect(document.querySelector(`div[slot="actions"]`)).toBeInTheDocument();
	});

	it('should render eyebrow slot', () => {
		render(basicPostPreview);
		expect(screen.getByText(/Hello from PostPreview's eyebrow/i)).toBeInTheDocument();
	});

	it('should render text wrapped in <p> tag when post.preview.html is a plain text just like post.preview.text (description is provided in frontmatter', () => {
		const post = {
			...mockPostData,
			preview: {
				text: mockPostData.description,
				html: mockPostData.description
			}
		};

		const customPostPreview = html`
		<${PostPreview} post=${post}>
			<slot slot="eyebrow">
				<p>Hello from PostPreview's eyebrow</p>
			</slot>
		</${PostPreview}>
		`;

		render(customPostPreview);
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		expect(screen.getByText(mockPostData.preview.text!).tagName).toBe('P');
	});

	it('should render html escaped text when post.preview.html is available (description is not provided in frontmatter)', () => {
		render(basicPostPreview);
		expect(screen.getByTestId('html-preview')).toBeInTheDocument();
	});
});
