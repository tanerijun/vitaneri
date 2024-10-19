---
datetime: 2023-08-22T01:55:58.565Z
title: Use Configurations From Tailwind In Vanilla CSS
description: A guide on how to use Tailwind's configuration (like colors, spacing, etc.) in vanilla CSS.
tags:
  - css
---

You might have been in a situation where you're forced or would prefer to write vanilla CSS in a Tailwind project.

In my case, I wanted to write some animation code involving multiple keyframes, and pseudo-elements, and implementing it in Tailwind resulted in a class name that's very long and hard to read, so I reached out to vanilla CSS instead.

That's when I ran into a problem. I also wanted to use colors and spacing from my Tailwind configs. For example, instead of hard coding the red color `#dc2626` in my CSS file, I wished I can use Tailwind's `bg-red-600`. And fortunately, there's a solution.

## theme()

To solve this issue, we can use the `theme()` utility function from Tailwind. There's no need to import or configure anything, just use it directly in your CSS file.

Examples:

```css
button {
  background: theme(colors.red.600);
  color: theme(colors.red.100);
  padding: theme(spacing.4);
}
```

You can also use it for CSS variable like this:

```css
:root {
  --dark: theme(colors.zinc.900);
  --dark-shade: theme(colors.zinc.600);
  --light: theme(colors.white);
  --light-shade: theme(colors.zinc.400);
}
```

> Tips: If you use [Tailwind's Intellisense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss), you'll also get auto complete inside `theme()`.

## How It Works

So how does it work?

On build time, Tailwind will replace all the `theme()` calls with static value.

## Wrap Up

That's it for this post. Hope you find it useful.

One final thing, this trick not only works in Vanilla CSS but also in scoped CSS in frontend frameworks like Vue, Svelte, Astro, etc.
