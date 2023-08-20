---
datetime: 2022-09-21T20:22:32.000Z
title: How To Debug TypeScript In VSCode
description: "How to configure VSCode's built-in debugger to debug a TypeScript Node application."
tags:
  - typescript
  - vscode
---

Let's take a look at how we can configure VSCode's built-in debugger to debug a TypeScript Node application.

## Install Dependencies

First, you have to install these dependencies (I prefer installing them as dev dependencies):

```
npm install --save-dev typescript ts-node tsconfig-paths
```

## Generate Source Map

Create a `tsconfig.json` file by running:

```
tsc --init
```

or create the file yourself.

Then add `"sourceMap": true` to the `compilerOptions`.

Your `tsconfig.json` file will now look something like this:

```json
{
	"compilerOptions": {
		"target": "ES3",
		"module": "commonjs",
		"strict": true,
		"esModuleInterop": true,
		"skipLibCheck": true,
		"forceConsistentCasingInFileNames": true,
		"sourceMap": true
	}
}
```

By setting the `sourceMap` property to `true`. The TypeScript compiler will now also generate a `.map` file as well as a `.js` file for each of our TypeScript files.

Node is a JavaScript runtime. It will only execute JavaScript code. The generated `.map` file tells VSCode how to map the executing JavaScript code back to our TypeScript source.

## Configure Debugger

Next, go to the debug tab, and add a JSON configuration file named `launch.json` with these contents:

```json
{
	"version": "0.2.0",
	"configurations": [
		{
			"type": "node",
			"request": "launch",
			"name": "ts-debug",
			"skipFiles": ["<node_internals>/**"],
			"program": "${workspaceFolder}/index.ts",
			"runtimeArgs": ["-r", "ts-node/register", "-r", "tsconfig-paths/register"],
			"outFiles": ["${workspaceFolder}/**/*.js"]
		}
	]
}
```

Feel free to change the `name` field to anything you like.

The most important part here is `runtimeArgs`, which contains optional arguments to be passed to the runtime executable.

We write `"-r"` which stands for `require` to register `ts-node` and `tsconfig-paths`. `tsconfig-paths` is used to load modules whose location is specified in the paths section of `tsconfig.json`.

Finally, make sure the `program` field points to the entry point of your app.

## Wrap Up

That's it. You're done with the configuration. Now, you can put breakpoints on your code, and click on the start debugging icon or simply press the keyboard shortcut, F5, to debug.
