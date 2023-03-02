import { render, screen } from '@testing-library/svelte';
import html from 'svelte-htm';
import SocialLink from './SocialLink.svelte';

describe('SocialLink', () => {
	it('should render a link with the correct href', () => {
		render(SocialLink, { href: 'https://example.com', title: 'Example' });
		expect(screen.getByRole('link')).toHaveAttribute('href', 'https://example.com');
	});

	it('should render a link with title', () => {
		render(SocialLink, { href: 'https://example.com', title: 'Example' });
		expect(screen.getByRole('link')).toHaveAttribute('title', 'Example');
	});

	it('should render a link that open in new tab', () => {
		render(SocialLink, { href: 'https://example.com', title: 'Example' });
		expect(screen.getByRole('link')).toHaveAttribute('target', '_blank');
	});

	it('should render the slotted component properly', () => {
		render(
			html`
				<${SocialLink} href="https://example.com" title="Example">
					<div data-testid="slotted">
						ICON
					</div>
				</${SocialLink}>
			`
		);
		expect(screen.getByTestId('slotted')).toBeInTheDocument();
	});
});
