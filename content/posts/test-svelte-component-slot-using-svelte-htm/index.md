---
datetime: 2023-03-01T16:13:49.880Z
title: Test Svelte Component Slot Using svelte-htm
slug: test-svelte-component-slot-using-svelte-htm
featured: false
tags:
  - svelte
description: A short guide on how to test Svelte component with slot using the svelte-htm library.
---

This is a short guide on how to test a Svelte component with slot using the [svelte-htm](https://github.com/kenoxa/svelte-htm) library.

## Introduction

At the time of writing this article, there's no way to pass in slot content to Svelte component using [svelte-testing-library](https://testing-library.com/docs/svelte-testing-library/intro/).

The workaround for this is usually by creating a separate dummy component that put some elements inside the slot and test the dummy component instead.

For example, say that we have a `Button.svelte` component.

```svelte
<button>
	<slot />
</button>
```

To test if the component inside the slot is rendered properly, we have to create a dummy component that use `Button.svelte`. We'll call this component `TestButton.svelte`.

```svelte
<script>
	import Button from ./Button.svelte;
</script>

<Button>
	<div data-testid="slot-component">PLACEHOLDER</div>
</Button>
```

Finally, we can test the component.

```ts
// Other imports
import TestButton from './TestButton.svelte';

describe('Button', () => {
	it('should render component inside slot properly', () => {
		render(TestButton);
		expect(screen.getByTestId('slot-component')).toBeInTheDocument();
	});
});
```

That works, but it's certainly not a fun experience, and your project is probably going to be littered by bunches of dummy component.

## Solution

The solution to this problem is to use `svelte-htm`.

`svelte-htm` allows us to write our Svelte components with JSX-like syntax. It completely eliminates our need of dummy component. We can test our Svelte component just like how we test components from JSX-based framework like [React](https://reactjs.org/).

Now, let's refactor our test using `svelte-htm`.

```ts
// Other imports
import html from `svelte-htm`;
import Button from './Button.svelte'

describe("Button", () => {
	it("should render component inside slot properly", () => {
		render(html`
			<${Button}>
				<div data-testid="slot-component">PLACEHOLDER</div>
			</${Button}>
		`);
		expect(screen.getByTestId("slot-component")).toBeInTheDocument();
	});
});
```

That's all we need to do. Felt much more natural, right?

You might think that the syntax is still not as nice as testing JSX component, but it's pretty close, and I would consider this solution a major leap compared to the dummy component solution.

In case you're wondering how the test would look like for JSX component:

```tsx
// Other imports
import Button from './Button.tsx';

describe('Button', () => {
	it('should render component inside slot properly', () => {
		render(
			<Button>
				<div data-testid="slot-component">PLACEHOLDER</div>
			</Button>
		);
		expect(screen.getByTestId('slot-component')).toBeInTheDocument();
	});
});
```

## Testing Named Slot

We can test named slot just like how we test normal slot in the examples above.

Here is an example:

Let's change our `Button.svelte` component to use named slot.

```svelte
<button>
	<div>
		<slot name="icon" />
	</div>
	<div>
		<slot name="label" />
	</div>
</button>
```

Now, to test it:

```ts
// Other imports
import html from `svelte-htm`;
import Button from './Button.svelte'

describe("Button", () => {
	it("should render component inside slot properly", () => {
		render(html`
			<${Button}>
				<div slot="icon">ICON</div>
				<div slot="label">Click me!</div>
			</${Button}>
		`);
		// assertions here ...
	});
});
```

You get the idea :)

## Wrap Up

That's it for this post. You should be able to test your Svelte components that have slot now. Happy testing!
