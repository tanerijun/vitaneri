import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/svelte';
import html from 'svelte-htm';
import Card from './Card.svelte';

describe('Card', () => {
	it('should render a div element by default', () => {
		render(Card);
		expect(screen.getByTestId('card')).toBeInstanceOf(HTMLDivElement);
	});

	it('should render a dynamic tag when passed an "as" prop', () => {
		render(Card, { props: { as: 'header' } });
		expect(screen.getByTestId('card').tagName).toBe('HEADER');
	});

	it('should pass custom classes to the card element', () => {
		render(Card, { props: { class: 'custom-class' } });
		expect(screen.getByTestId('card')).toHaveClass('custom-class');
	});

	it('should render an <a> tag when passed href prop and title', () => {
		const { container } = render(
			html`<${Card} href="https://www.example.com"><slot slot="title">Title</slot></${Card}>`
		);
		const anchorTags = container.getElementsByTagName('a');
		expect(anchorTags).toHaveLength(1);
		expect(anchorTags[0]).toHaveAttribute('href', 'https://www.example.com');
	});

	it('should render content in eyebrow slot properly', () => {
		render(
			html`<${Card}><slot slot="eyebrow"><div data-testid="slotted">Content</div></slot></${Card}>`
		);
		expect(screen.getByTestId('slotted')).toBeInTheDocument();
	});

	it('should render content in title slot properly', () => {
		render(
			html`<${Card}><slot slot="title"><div data-testid="slotted">Content</div></slot></${Card}>`
		);
		expect(screen.getByTestId('slotted')).toBeInTheDocument();
	});

	it('should render content in description slot properly', () => {
		render(
			html`<${Card}><slot slot="description"><div data-testid="slotted">Content</div></slot></${Card}>`
		);
		expect(screen.getByTestId('slotted')).toBeInTheDocument();
	});

	it('should render content in actions slot properly', () => {
		render(
			html`<${Card}><slot slot="actions"><div data-testid="slotted">Content</div></slot></${Card}>`
		);
		expect(screen.getByTestId('slotted')).toBeInTheDocument();
	});
});
