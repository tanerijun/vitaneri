---
title: How To Integrate Utterances With Astro
datetime: 2022-10-07T09:53:35Z
slug: how-to-integrate-utterances-with-astro
featured: true
tags:
  - astro
  - utterances
description: "Let's take a look at how I integrated Utterances with my Astro blog without any additional UI library (Using Astro component)."
---

In this post, we're going to take a look at how I integrated Utterances with my Astro blog without any additional UI library. We'll create an Astro component that handle calling the Utterances script, and also see how we can change the theme of the Utterances' IFrame dynamically.

## What Is Utterances

First, let's get to know [Utterances](https://utteranc.es/). Utterances is a lightweight comments widget build on GitHub issues. It's also completely free and open source. I'm using Utterances as the comment system of my blog, you can scroll down to the comments section below to see Utterances in action.

> You can read more about Utterances in its [official website](https://utteranc.es/).

## Generating Utterances Script

Before we can put Utterances in our site, we have to generate a script to call the Utterances IFrame. You can do it by following the instructions in the [official website](https://utteranc.es/) or the instructions below if you don't want to leave the site 😆.

First, you have to [install Utterances in your GitHub account](https://github.com/apps/utterances). Give Utterances access to your site's repository and make sure that the repository is _public_.

Next, fill in the template below with your information.

```html
<script
	src="https://utteranc.es/client.js"
	repo="[ENTER REPO HERE]"
	issue-term="[ISSUE TERM]"
	label="[LABEL NAME]"
	theme="[THEME NAME]"
	crossorigin="anonymous"
	async
></script>
```

Leave `src` as it is.

The `repo` structure is: `owner/repo`. For example: `repo=tanerijun/vitaneri-v3`.

For `issue-term`, you can choose among: `pathname`, `url`, `title`, `og:title`, `[ISSUE NUMBER]`, `[SPECIFIC TERM]`.

Fill `label` with the label that'll be assigned to issues created by Utterances. `label` is optional. If you don't need it, just remove the `label` attribute from the `script` tag. But if you do need it, make sure that the label exist in your repo. To create your own issue label, you can read the instructions [here](https://docs.github.com/en/issues/using-labels-and-milestones-to-track-work/managing-labels#creating-a-label).

As for `theme`, you can choose among these options: `github-light`, `github-dark`, `preferred-color-scheme`, `github-dark-orange`, `icy-dark`, `dark-blue`, `photon-dark`, `boxy-light`, `gruvbox-dark`.

The next step is to call that script from your Astro app.

## Creating Utterances Astro component

Let's create a component that can call that Utterances script for reusability. Start by creating an Astro component. I named mine `Utterances.astro`.

Next, put a single `div` element in the component with whatever `id` you like. It's going to serve as a container for Utterances.

```html
<div id="utterances-container"></div>
```

To send the script to the client, we have to write our JavaScript in a `<script>` tag, not frontmatter(`---`). Inside the `<script>` tag, let's put in these code:

```js
const script = document.createElement('script');
const container = document.querySelector('#utterances-container'); // your id in your html above

// Replace the value of each key with yours
Object.entries({
	src: 'https://utteranc.es/client.js',
	repo: 'tanerijun/vitaneri-v3',
	'issue-term': 'pathname',
	label: 'post comments', // omit this line, if you don't need label
	theme: 'github-dark',
	crossorigin: 'anonymous'
}).forEach(([key, value]) => {
	script.setAttribute(key, value);
});

container?.appendChild(script);
```

So basically, we're creating a `script` element, then we assign it all our Utterances` script attributes, and finally, we insert the script into the container.

Your `Utterances.astro` should now look something like this:

```astro
<div id="utterances-container"></div>

<script>
  const script = document.createElement("script");
  const container = document.querySelector("#utterances-container");

  Object.entries({
    src: "https://utteranc.es/client.js",
    repo: "tanerijun/vitaneri-v3",
    "issue-term": "pathname",
    label: "post comments",
    theme: "github-dark",
    crossorigin: "anonymous",
  }).forEach(([key, value]) => {
    script.setAttribute(key, value);
  });

  container?.appendChild(script);
</script>
```

With that, we're finished with the component. You can plug it wherever you want your Utterances comment to show up.

## Changing Utterances Theme Based On Site Theme

Now let's take this a step further by having the Utterances theme match the site theme. This part really depends on how the theming system on your site works. A common approach is to persist theming information in local storage. I'm going to use that as an example here.

```astro {6, 14}
<div id="utterances-container"></div>

<script>
  const script = document.createElement("script");
  const container = document.querySelector("#utterances-container");
  const currentTheme = localStorage.getItem("theme");

  // Set configurations
  Object.entries({
    src: "https://utteranc.es/client.js",
    repo: "tanerijun/vitaneri-v3",
    "issue-term": "pathname",
    label: "post comments",
    theme: currentTheme == "light" ? "github-light" : "github-dark",
    crossorigin: "anonymous",
  }).forEach(([key, value]) => {
    script.setAttribute(key, value);
  });

  container?.appendChild(script);
</script>
```

Nice our Utterances theme change dynamically now. But it's still not perfect.

Usually, a site that support both light mode and dark mode will have a button to toggle between the modes. With our current implementation, the theme only change when our component mounts. In other words, even if we click on the button to toggle site theme change, we have to refresh the page before Utterance know about the change.

## Synchronizing Utterances Theme With Site Theme

In order to make sure the Utterance theme is synced with the `theme` value in our local storage, we are going to create a function to trigger theme change manually and bind it to our light/dark mode toggle button.

```ts
function toggleUtterancesTheme() {
	if (document.querySelector('.utterances-frame')) {
		const theme = localStorage.getItem('theme') === 'light' ? 'github-light' : 'github-dark';
		const message = {
			type: 'set-theme',
			theme
		};
		const iframe = document.querySelector('.utterances-frame') as HTMLIFrameElement; // omit as HTMLIFrameElement if you're wring JS
		iframe?.contentWindow?.postMessage(message, 'https://utteranc.es');
	}
}
```

The function read our new `theme` value and send a message containing the new `theme` value to the Utterance IFrame. This way we can change the Utterance theme without refreshing the page.

And finally, we need to make sure our light/dark mode toggle button change the value in local storage and call the function.

```ts
themeBtn?.addEventListener('click', function () {
	// toggle light/dark mode
	if (htmlClassList?.contains('theme-dark')) {
		localStorage.setItem('theme', 'light');
	} else {
		localStorage.setItem('theme', 'dark');
	}
	toggleUtterancesTheme();
});
```

With that, our Utterances theme will be in sync with our local storage 🎉.

## Wrap up

That's it for this post. We've successfully integrate Utterances with our Astro site. You might need to adjust the theme codes with how your theme system is implemented, but you should have a general idea of how to do it now. If you have any questions, feel free to comment below.
