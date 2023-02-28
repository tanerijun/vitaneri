import Button from '../Button.svelte';
import ButtonSlot from './components/ButtonSlot.svelte';
import { render, screen } from '@testing-library/svelte';
import '@testing-library/jest-dom';

describe('Button', () => {
	it('should render a button element', () => {
		render(Button);
		expect(screen.getByRole('button')).toBeInTheDocument();
	});

	it('should pass custom classes to the button element', () => {
		render(Button, { props: { class: 'custom-class' } });
		expect(screen.getByRole('button')).toHaveClass('custom-class');
	});

	it('should pass extra props to the button element', () => {
		render(Button, { props: { 'random-prop': 'value' } });
		expect(screen.getByRole('button')).toHaveAttribute('random-prop', 'value');
	});

	it('should render slotted component inside the button', () => {
		render(ButtonSlot);
		expect(screen.getByRole('button')).toHaveTextContent('Hello from slot!');
	});
});
