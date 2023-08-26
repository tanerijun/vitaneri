---
datetime: 2023-01-06T13:07:13.165Z
title: "Setting Up Vitest, Testing Library, And jest-dom In Your Vite Project"
description: "A guide on setting up Vitest, Testing Library, and jest-dom for unit testing a Vite project."
tags:
  - vitest
  - javascript
  - typescript
---

This will be a brief tutorial on how to setup Vitest, Testing Library, and jest-dom in your Vite Project.

## Setup Vite Project

Before we can setup our testing tools, we first need a Vite project. We can scaffold a Vite project easily by running the command:

```
npm create vite@latest
```

Next, you'll be prompted for your project name, your front-end framework of choice, and whether you need Typescript or not.

In this project, let's assume that we choose [Svelte](https://svelte.dev/) as our front-end framework and Typescript as our language of choice.

> The steps are more or less the same regardless of what framework you're using.

## Install Vitest

The next step is to install Vitest using the command:

```
npm install --save-dev vitest
```

We also need to install `jsdom` to simulate the DOM for our frontend app.

```
npm install --save-dev jsdom
```

Next, we need to tell Vitest to change our testing environment to `jsdom`. Create a file called `vitest.config.ts` or `.js` depending on your preferences, and pass the following code in.

```ts
import { defineConfig } from "vitest/config";
import { svelte } from "@sveltejs/vite-plugin-svelte";

export default defineConfig({
	plugins: [svelte({ hot: !process.env.VITEST })],
	test: {
		include: ["src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
		environment: "jsdom",
	},
});
```

One thing to note about Vitest is that unlike Jest, globals are not enabled by default. This means that we have to explicitly import `describe`, `test`, `expect`, etc. on our test files like this:

```ts
import { describe, test, expect } from "vitest";
```

But if you prefer, you can enable the test APIs globally like Jest. To enable globals support, we need to add the following line into our `vitest.config.ts` file.

```ts {8}
import { defineConfig } from "vitest/config";
import { svelte } from "@sveltejs/vite-plugin-svelte";

export default defineConfig({
	plugins: [svelte({ hot: !process.env.VITEST })],
	test: {
		include: ["src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
		globals: true,
		environment: "jsdom",
	},
});
```

If you're using Typescript, we need to do one extra step to please the type checker. We need to add `vitest/globals` to `compilerOptions` in `tsconfig.json`.

```json {12}
{
	"extends": "@tsconfig/svelte/tsconfig.json",
	"compilerOptions": {
		"target": "ESNext",
		"useDefineForClassFields": true,
		"module": "ESNext",
		"resolveJsonModule": true,
		"allowJs": true,
		"checkJs": true,
		"isolatedModules": true,
		"moduleResolution": "node",
		"types": ["vitest/globals"]
	},
	"include": ["src/**/*.d.ts", "src/**/*.ts", "src/**/*.js", "src/**/*.svelte"],
	"references": [{ "path": "./tsconfig.node.json" }]
}
```

And finally, let's add the following to our `package.json` file for convenience sake.

```json
{
	"scripts": {
		"test": "vitest run src",
		"test:watch": "vitest src"
	}
}
```

Now, we can run our tests with `npm run test` or `npm run test:watch` to run in watch mode.

## Install Testing Library

Installing Vitest is enough to test our app. But [Testing Library](https://testing-library.com/) offers us a lot of utilities that'll make our life easier.

For example, the `render` method save us the trouble of creating a container, appending it to the body, and cleaning up the container after test, etc.

Testing Library supports multiple framework. And since we're assuming that this is a Svelte project, we'll be using the [Svelte Testing Library](https://testing-library.com/docs/svelte-testing-library/intro#).

```
npm install --save-dev @testing-library/svelte
```

## Install jest-dom

jest-dom is a really nice addition on top of Testing Library. It's a custom matcher that's really useful to test the state of the DOM.

> Matcher is what you put after `expect`. For example: `expect(getByTestId('input')).toBeDisabled()`. `toBeDisabled()` is one of the useful matchers provided by jest-dom.

Install it by running:

```
npm install --save-dev @testing-library/jest-dom
```

Now, we can use the matchers by importing `@testing-library/jest-dom` at the start of our test files.

```ts
import "@testing-library/jest-dom";
```

We can make our experience even better by extending the matcher with a Vitest setup file. The filename doesn't matter, but let's assume that the file name is `./src/tests/setup.ts`. Inside the file, paste in the following code:

```ts
import { expect } from "vitest";
import matchers from "@testing-library/jest-dom/matchers";

expect.extend(matchers);
```

We also need to tell Vitest where to look for our setup file.

```ts {10}
import { defineConfig } from "vitest/config";
import { svelte } from "@sveltejs/vite-plugin-svelte";

export default defineConfig({
	plugins: [svelte({ hot: !process.env.VITEST })],
	test: {
		include: ["src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
		globals: true,
		environment: "jsdom",
		setupFiles: "./src/tests/setup.ts",
	},
});
```

Now, we don't need to manually import `@testing-library/jest-dom` anymore in our test files.

One final thing before we end this tutorial.

In my case, Typescript couldn't find the type definition for the matchers. So even though all my tests run just fine, I didn't get auto completion for the matcher in my IDE and got a squiggly red line instead.

If you have the same issue, install the type definition for jest-dom.

> If you're not using Typescript, or don't experience this issue, you can skip this step.

```
npm install --save-dev @types/testing-library__jest-dom
```

And update your `tsconfig.json`.

```json {12}
{
	"extends": "@tsconfig/svelte/tsconfig.json",
	"compilerOptions": {
		"target": "ESNext",
		"useDefineForClassFields": true,
		"module": "ESNext",
		"resolveJsonModule": true,
		"allowJs": true,
		"checkJs": true,
		"isolatedModules": true,
		"moduleResolution": "node",
		"types": ["vitest/globals", "@testing-library/jest-dom"]
	},
	"include": ["src/**/*.d.ts", "src/**/*.ts", "src/**/*.js", "src/**/*.svelte"],
	"references": [{ "path": "./tsconfig.node.json" }]
}
```

With that, everything should now work as expected 😁.

## Wrap Up

That's it, we're done with our test setup. Now simply create your tests, and run it using the command:

```
npm run test
```

Happy testing!
