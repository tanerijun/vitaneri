---
datetime: 2023-08-19T12:44:35.138Z
title: Web Scraping On The Edge Using HTMLRewriter
description: "A guide on doing light web scraping on edge environments like Cloudflare Worker using HTMLRewriter."
tags:
  - typescript
  - cloudflare
  - hono
---

In this tutorial, we're going to create a web scraper using HTMLRewriter. Specifically, we're going to create a web service that scrape what a user is currently reading on [Goodreads](https://www.goodreads.com/) served as JSON data.

## Technologies

First, a short introduction to the techs we're going to use.

#### HTMLRewriter

As the name suggest, HTMLRewriter is a super lightweight and fast tool to rewrite HTML created for the edge environment like [Cloudflare Workers](https://workers.cloudflare.com/), [Deno](https://deno.land/), and [Bun](https://bun.sh/).

Even if it's main purpose is to rewrite HTML, we can also use it to parse HTML, because it can't rewrite HTML without parsing it first.

It might not be ideal for large scale scraping though (which you'll see in the examples later on), but for our purpose, it's more than enough.

If you're interested with HTMLRewriter, you can read more about the history of its creation on [Cloudflare's blog](https://blog.cloudflare.com/html-parsing-1/).

#### Hono

[Hono](https://hono.dev/) is a small, simple, and ultrafast web framework designed for the edge. We're going to use Hono as our router.

#### Cloudflare Workers

The app will be deployed as a [Cloudflare Worker](https://workers.cloudflare.com/) running on the edge (close to your users).

> Note that even though, We're deploying to Cloudflare Worker in this tutorial, the tutorial should also apply for other environments that implement HTMLRewriter like [Deno](https://deno.land/x/html_rewriter) and [Bun](https://bun.sh/docs/api/html-rewriter).

## Building The Scraper

Let's begin building our app.

> For those that prefer to just read the code, the source code is open sourced on [Github](https://github.com/tanerijun/goodreads-currently-reading).

### Setup

Let's begin by scaffholding our project using the Cloudflare Workers template from Hono.

```sh
npm create hono@latest my-app
```

Then select Cloudflare Workers (_Arrow key to move, and Space key to select_) in the provided options.

Make sure to install the dependencies by running:

```sh
npm install
```

And you should now be able to start the dev server by running:

```sh
npm run dev
```

Now, if you go to the provided link, default to `http://127.0.0.1:8787/`, you should see the text `Hello Hono!`.

### File structure

The generated file structure is really simple. Other than the standard npm stuff, the one that you might not be familiar with if you've never build a Cloudflare Worker before is `wrangler.toml`.

The file contains metadata and configurations for the project. For example: your `Worker KV`, `D1`, etc.

In this project though, we're not going to need any of that. But you can change the `name` to the name of your app. Cloudflare will use the `name` as part of your deployed app's URL, and also as an identifier in Cloudflare's dashboard.

I'm going to name mine: `goodreads-currently-reading`

```toml title="wrangler.toml"
name = "goodreads-currently-reading"
compatibility_date = "2023-01-01"
```

Alright, now that we're done here. Let's explore `src/index.ts`, where we're going to spend our time in, for the rest of the tutorial.

### Routing

Now, if you open the file, you should be greeted with code similar to this:

```ts title="src/index.ts"
import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => c.text("Hello Hono!"));

export default app;
```

The code should be really familiar if you have experience with backend frameworks like [Express](https://expressjs.com/).

Our app will only have 1 route, `/:id`. The `id` here refers to Goodreads' user id. To create the route, just add the following code after the `index` route handler:

```ts {7-11}
import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => c.text("Hello Hono!"));

app.get("/:id", async (c) => {
	const id = c.req.param("id");

	return c.json({ userId: id });
});

export default app;
```

Verify that your app is working by going to `/<anything>`.

You should get a JSON response like this.

```ts
{
	userId: 123;
}
```

### Fetching

Now that we have the user ID, we need to use it to fetch the "currently-reading" page of the user from Goodreads.

In case you don't know, you can get your Goodreads' user ID by going to your profile page in Goodreads. And it's there in the URL. For example, here is mine:

```
https://www.goodreads.com/user/show/74091755-tvince
```

We only need the `id` number (`74091755`). So feel free to omit the following `username`.

Going back to the code, here is how you can fetch the "currently-reading" page:

```ts {4}
app.get("/:id", async (c) => {
	const id = c.req.param("id");

	const response = await fetch(`https://www.goodreads.com/review/list/${id}?shelf=currently-reading`);

	return c.json({ userId: id });
});
```

> Tips: You can also fetch other shelves by modifying `shelf=currently-reading`. For example: `shelf=read`.

Let's also do a minimal error handling in case the fetch request fails.

```ts {5}
app.get("/:id", async (c) => {
	const id = c.req.param("id");

	const response = await fetch(`https://www.goodreads.com/review/list/${id}?shelf=currently-reading`);
	if (!response.ok) throw new HTTPException(response.status, { message: response.statusText });

	return c.json({ userId: id });
});
```

### Scraping

Now, that we're connected with Goodreads. We can start scraping.

To start scraping, we have to pass `response` to HTMLRewriter to parse and transform. But since we don't need the result of the transformation, we can just ignore it.

```ts
app.get("/:id", async (c) => {
	// Fetch Goodreads with userId...

	// Array to store our data
	const res: { title: string; url: string }[] = [];

	await new HTMLRewriter()
		.on("td.field.title a", {
			element(el) {
				const title = el.getAttribute("title");
				const url = el.getAttribute("href");
				if (title && url) {
					res.push({ title, url });
				}
			},
		})
		.transform(response)
		.arrayBuffer(); // drive the parser

	return c.json(res); // return the array as JSON
});
```

We created an array to store our data, then we pass the response to the HTMLRewriter instance.

The interesting and most important bit here is the `.on` method. Its first argument is a [selector](https://developers.cloudflare.com/workers/runtime-apis/html-rewriter/#selectors), and its second argument is an instance of [ElementHandler](https://developers.cloudflare.com/workers/runtime-apis/html-rewriter/#element-handlers).

The `ElementHandler` looks like this in full:

```ts
class ElementHandler {
	element(element) {
		// An incoming element
	}

	comments(comment) {
		// An incoming comment
	}

	text(text) {
		// An incoming piece of text
	}
}
```

In the case of our app, our selector captured an HTML tree that look like this:

```html
<a title="Pixel Art for Game Developers" href="/book/show/26117789-pixel-art-for-game-developers">
	Pixel Art for Game Developers
</a>
```

Now, if this tree is passed to `ElementHandler`:

Then `element` refers to the `<a>` tag, while the `text` refers to the text inside ("Pixel Art for Game Developers"), and `comment` is `undefined` in this case, since there's no HTML comment.

Now, back to our app.

Since the data that I needed is conveniently provided in the `<a>` element, I can just take it using the `getAttribute` method and push it into the array.

```ts
element(el) {
  const title = el.getAttribute("title");
  const url = el.getAttribute("href");
	// Type guard to make Typescript happy
  if (title && url) {
    res.push({ title, url });
  }
},
```

Now if you run the app, go to `/:id`, and check the result, you should get the data as intended.

```json
[
	{
		"title": "さくら荘のペットな彼女",
		"url": "/book/show/16088343"
	},
	{
		"title": "Thinking, Fast and Slow",
		"url": "/book/show/11468377-thinking-fast-and-slow"
	}
]
```

### Finalizing

That's it for our app. We achieved our objective. Here is the code in full.

```ts
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";

const BASE_URL = "https://goodreads.com";

const app = new Hono();

app.get("/", (c) => c.text("Hello Hono!"));

app.get("/:id", async (c) => {
	const id = c.req.param("id");

	const response = await fetch(`${BASE_URL}/review/list/${id}?shelf=currently-reading`);
	if (!response.ok) throw new HTTPException(response.status, { message: response.statusText });

	const res: { title: string; url: string }[] = [];

	await new HTMLRewriter()
		.on("td.field.title a", {
			element(el) {
				const title = el.getAttribute("title");
				const url = el.getAttribute("href");
				if (title && url) {
					res.push({ title, url: BASE_URL + url });
				}
			},
		})
		.transform(response)
		.arrayBuffer();

	return c.json(res);
});

export default app;
```

Notice that I refactored the app a bit because the `href` attribute of the `<a>` is relative, but I want it to be an absolute URL. So, I extracted the Goodreads url into a separate variable.

You should also adjust yours to better fit your needs. Maybe you also want to scrape the cover? the rating? You got the idea.

### Deploying

Finally, you can deploy your app using the command:

```sh
npm run deploy
```

You might be prompted to sign in if it's your first time using Wrangler. Simply follow the instructions.

Wrangler should start deploying your project, and you should get a live URL to your app. Congrats!

## Bonus

I hope that by now you have a pretty a good idea of how to use HTMLRewriter for web scraping. As a bonus content, I want to address some common gotchas when using HTMLRewriter for web scraping.

### Text Content Might Come In Chunk

Say that we have an HTML that look like this:

```html
<p>Hello, world!</p>
```

When you access the text using HTMLRewriter, it might come in chunks like: `He`, `llo, `, `world`, `!`.

So, always remember to concatenate these chunks when scraping for text data.

You'll see an example in the next section.

### Can't Directly Access Nested Element

At the time of writing, The [Element](https://developers.cloudflare.com/workers/runtime-apis/html-rewriter/#element) object doesn't have any method to directly access nested elements. So, in order to access nested elements, we have to run separate selectors and handlers for them.

For example, say that our HTML look like this:

```html
<a href="/A" title="A">
	<img src="https://link-to-foo.png" />
	<span class="caption">Foo</span>
</a>
<a href="/B" title="B">
	<img src="https://link-to-bar.png" />
	<span class="caption">Bar</span>
</a>
```

And we want our data to be in this shape:

```ts
type Item = {
	title: string | null;
	url: string | null;
	img: string | null;
	caption: string | null;
};
```

When we're on the `a` selector, we have no way to access the nested `<img />` and `<span>` inside it. To access them, we need to create separate selectors to handle each case.

Like this:

```ts
const item: Item = { title: null, url: null, string: null, caption: null };

await new HTMLRewriter()
	.on("a", {
		element(el) {
			item.title = el.getAttribute("title");
			item.url = el.getAttribute("href");
		},
	})
	// Separate selector for nested element
	.on("a img", {
		element(el) {
			item.img = el.getAttribute("src");
		},
	})
	// Separate selector for nested element
	.on("a .caption", {
		text({ text }) {
			// Handle null because initial value is null
			if (item.caption === null) {
				item.caption = text;
				return;
			}

			// String concatenation because text might come in chunks
			item.caption += text;
		},
	})
	.transform(response)
	.arrayBuffer();
```

And it can get a little complicated when we need to scrape multiple items.

```ts
// Array to store the results
const items: Item[] = [];

await new HTMLRewriter()
	.on("a", {
		element(el) {
			// This selector is the start of a new Item object
			const item: Item = { title: null, url: null, img: null, caption: null };
			item.title = el.getAttribute("title");
			item.url = el.getAttribute("href");
			items.push(item);
		},
	})
	// Separate selector for nested element
	.on("a img", {
		element(el) {
			// Access the latest item added by the parent's handler
			const lastItem = items[items.length - 1];
			lastItem.img = el.getAttribute("src");
		},
	})
	// Separate selector for nested element
	.on("a .caption", {
		text({ text }) {
			const lastItem = items[items.length - 1];

			// Handle null because initial value is null
			if (lastItem.caption === null) {
				lastItem.caption = text;
				return;
			}

			// String concatenation because text might come in chunks
			items[items.length - 1].caption += text;
		},
	})
	.transform(response)
	.arrayBuffer();
```

Fortunately, as you might have noticed, our handlers are called in order, allowing the code above to work.

## Wrap Up

That's it! Hope you find the tutorial useful. And if you need it, the source code for `goodreads-currently-reading` is on my [Github](https://github.com/tanerijun/goodreads-currently-reading).
