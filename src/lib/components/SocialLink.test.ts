import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/svelte';
import SocialLink from './SocialLink.svelte';
import SocialLinkTest from './test-components/SocialLinkTest.svelte';

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
		render(SocialLinkTest);
		expect(screen.getByTestId('icon')).toBeInTheDocument();
	});
});
