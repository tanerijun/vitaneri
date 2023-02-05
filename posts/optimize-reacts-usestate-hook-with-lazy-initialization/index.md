---
author: Vincent Taneri
datetime: 2023-01-16T14:18:32.943Z
title: "Optimize React's useState Hook With Lazy Initialization"
slug: optimize-reacts-usestate-hook-with-lazy-initialization
featured: false
draft: false
tags:
  - javascript
  - react
ogImage:
description: "An explanation of a way to optimize React's useState hook with lazy initialization."
---

In this post, we'll look at a way to optimize React's `useState` hook called [lazy initialization](https://reactjs.org/docs/hooks-reference.html#lazy-initial-state).

## Table Of Contents

## The Problem

So there's this method to optimize React's performance that I think is less-known (maybe it's just me 🫠) called **lazy initialization**. It's a way to optimize the React's `useState` hook.

Let's start by looking at an example.

```jsx
function NameForm = () => {
  const [name, setName] = useState(
    window.localStorage.getItem('name') ?? ""
  )

  useEffect(() => {
    window.localStorage.setItem('name', name)
  }, [name])

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name}
    </div>
  )
}
```

Let's see what's going on with the component. On render, we first check if there's already a previously stored value in the local storage and use it as the initial value for the `useState` hook. We also have a `useEffect` hook that update the local storage every time the name value is changed. And finally, we render an input and the name value to the screen.

In short, it's just a simple component with input that take in your name and display it on the screen.

As you know, reading from local storage is an IO operation, and it can potentially slow down our application.

In the example above, the `useState` hook read the value from local storage every time it re-renders. In this case, every time you type with the input box.

Is there a way to optimize this? Yes! This is where **lazy initialization** come in to play.

```jsx {3}
function NameForm = () => {
  const [name, setName] = useState(
    () => window.localStorage.getItem('name') ?? ""
  )

  useEffect(() => {
    window.localStorage.setItem('name', name)
  }, [name])

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name}
    </div>
  )
}
```

Instead of passing the initial value directly to the `useState` hook, we passed in a function that return the initial value instead.

Now, the `useState` hook will only get the value from local storage on initial render. Which is really what we want it to do.

## Wrap Up

This is a good performance optimization technique to use whenever the initial value for our `useState` hook is an expensive computation.

Hope you find it useful 👍🏻.
