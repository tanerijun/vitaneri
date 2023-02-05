---
author: Vincent Taneri
datetime: 2023-01-22T15:51:52.609Z
title: "Code Splitting In React Using React.lazy and React.Suspense"
slug: code-splitting-in-react-using-reactlazy-and-reactsuspense
featured: false
draft: false
tags:
  - javascript
  - react
ogImage:
description: "Short post about Code Splitting Using React.lazy and React.Suspense."
---

In this post, we will learn how to do code splitting in our React app using `React.lazy` and `React.suspense`.

## Table Of Contents

## Introduction

As we add more features to our React app, our app will get more and more bloated, resulting in bigger bundle size. Is there a way to minimize the bundle size while adding features to our app? _Code Splitting_ to the rescue 💪🏻.

Code splitting allows us to load our app with _lazy-loaded_ chunks. The idea is that we try to only load what's necessary for the user on initial load, and lazy-load the rest of our app when needed.

Imagine that you have a long blog post with multiple images. When the user load your page initially, it's a good idea to only load the featured image the user see, and load the rest of the images as the user scroll down. Images are usually pretty large in size, and lazy-loading them is a good idea.

Of course we're not limited to lazy-loading images, we can lazy-load anything, including codes. It's usually a good idea to lazy-load expensive component like graph, map, etc. You got the idea.

Code splitting won't magically reduce our app's overall bundle size, but it can potentially cut off our initial bundle size significantly when used correctly, resulting in better UX.

To accomplish this task in React, we need to use `React.lazy` and `React.Suspense`.

## React.lazy

`React.lazy` as the name suggests, allows us to import component lazily or dynamically. In other word, it allow components to be loaded _on demand_.

So how do we use it?

Let's first look at the example that we will use for the rest of the post.

Say that we have a toggle that hide and show a graph.

```jsx
import * as React from "react"
import Graph from "./Components/Graph"

export default function Toggle {
  const [showGraph, setShowGraph] = React.useState(false)

  return (
    <Switch
      on={showGraph}
      onClick={() => setShowGraph(!showGraph)}
    />
    <div>
      { showGraph ? <Graph /> : null}
    </div>
  )
}
```

In the code above, even though the `<Graph />` component is initially not rendered, the code for it is still requested and downloaded by the browser. This is not ideal.

Let's assume that the `<Graph />` component is pretty expensive and we want to lazy-load it instead. We want the code for it to be downloaded only when the user click on the switch and `showGraph === true`.

We can do it using `React.lazy` like this:

```jsx {3}
import * as React from "react"

const Graph = React.lazy(() => import("./Components/Graph"))

export default function Toggle {
  const [showGraph, setShowGraph] = React.useState(false)

  return (
    <>
      <Switch
        on={showGraph}
        onClick={() => setShowGraph(!showGraph)}
      />
      <div>
        { showGraph ? <Graph /> : null}
      <div>
    </>
  )
}
```

> Note that for this to work, the Graph component have to be a default export (`export default Graph` in `Graph.jsx`).

Now, the `<Graph />` component will be lazily-loaded when it's about to render.

But now, if you go to your browser and click on the switch, you'll see a white screen of the death 😰 instead.

This is because `React.lazy` need to be used in conjunction with `React.Suspense`. And so, on to the next section we go.

## React.Suspense

We need to wrap our lazy-loaded components inside `React.Suspense` for them to work properly.

```jsx {15, 17}
import * as React from "react"

const Graph = React.lazy(() => import("./Components/Graph"))

export default function Toggle {
  const [showGraph, setShowGraph] = React.useState(false)

  return (
   <>
      <Switch
        on={showGraph}
        onClick={() => setShowGraph(!showGraph)}
      />
      <div>
        <React.Suspense>
          { showGraph ? <Graph /> : null}
        </React.Suspense>
      <div>
    </>
  )
}
```

Now our app work as expected. But we can make the UX even better by providing a fallback component in `React.Suspense`.

```jsx {2, 17}
import * as React from "react"
import LoadingIndicator from "./Components/LoadingIndicator"

const Graph = React.lazy(() => import("./Components/Graph"))

export default function Toggle {
  const [showGraph, setShowGraph] = React.useState(false)

  return (
   <>
      <Switch
        on={showGraph}
        onClick={() => setShowGraph(!showGraph)}
      />
      <div>
        <React.Suspense fallback={<LoadingIndicator />}>
          { showGraph ? <Graph /> : null}
        </React.Suspense>
      <div>
    </>
  )
}
```

With this addition, when the user click the switch and the browser start fetching the code for `<Graph />`, the `<LoadingIndicator />` component will be shown in its place as a placeholder.

## Prefetching

We can improve the UX a step further by prefetching the code when the user show signs of clicking the switch. One thing that come to mind is when the user hover over the switch.

Prefetching can save us some milliseconds, but that's enough to make the difference between a fast and a clunky app.

One way to implement this is using the `mouseenter` event listener:

```jsx {14}
import * as React from "react"
import LoadingIndicator from "./Components/LoadingIndicator"

const Graph = React.lazy(() => import("./Components/Graph"))

export default function Toggle {
  const [showGraph, setShowGraph] = React.useState(false)

  return (
   <>
      <Switch
        on={showGraph}
        onClick={() => setShowGraph(!showGraph)}
        onMouseEnter={() => import("./Components/Graph")}
      />
      <div>
        <React.Suspense fallback={<LoadingIndicator />}>
          { showGraph ? <Graph /> : null}
        </React.Suspense>
      <div>
    </>
  )
}
```

That's it!

You might be wondering about whether it's actually fine to import the same component multiple times like we did above. The answer is that it's actually fine. The browser caches the imported components.

In the scenario above, when the user hover over the switch, we start importing the `<Graph />` component. And when the user finally click on the switch. This line of code: `React.lazy(() => import("./Components/Graph"))` will still run, but the component in the cache will be returned instead.

## Wrap Up

Finally, let's do some refactoring to reduce code duplication.

```jsx {4, 5, 15}
import * as React from "react"
import LoadingIndicator from "./Components/LoadingIndicator"

const loadGraph = () => import("./Components/Graph")
const Graph = React.lazy(loadGraph)

export default function Toggle {
  const [showGraph, setShowGraph] = React.useState(false)

  return (
   <>
      <Switch
        on={showGraph}
        onClick={() => setShowGraph(!showGraph)}
        onMouseEnter={loadGraph}
      />
      <div>
        <React.Suspense fallback={<LoadingIndicator />}>
          { showGraph ? <Graph /> : null}
        </React.Suspense>
      <div>
    </>
  )
}
```

That's it for this post. Hope you can see how easy it is to implement code splitting and it's benefit on performance and UX.
