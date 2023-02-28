import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/svelte';

import Card from './Card.svelte';
import CardSlot from './test-components/CardTest.svelte';

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

	it('should render slotted components inside the card ', () => {
		render(CardSlot);
		const card = screen.getByTestId('card');
		expect(card).toHaveTextContent('Hello from eyebrow slot');
		expect(card).toHaveTextContent('Hello from title slot');
		expect(card).toHaveTextContent('Hello from description slot');
		expect(card).toHaveTextContent('Hello from actions slot');
	});

	it('should render an <a> tag when passed href prop', () => {
		const { container } = render(CardSlot, { props: { href: 'https://www.example.com' } });
		const anchorTags = container.getElementsByTagName('a');
		expect(anchorTags).toHaveLength(1);
		expect(anchorTags[0]).toHaveAttribute('href', 'https://www.example.com');
	});
});
