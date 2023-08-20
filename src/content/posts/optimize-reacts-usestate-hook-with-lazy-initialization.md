---
datetime: 2023-01-16T14:18:32.943Z
title: "Optimize React's useState Hook With Lazy Initialization"
description: "A guide on optimizing React's performance using lazy initialization."
tags:
  - javascript
  - react
---

In this post, we'll look at a way to optimize React's `useState` hook called [lazy initialization](https://reactjs.org/docs/hooks-reference.html#lazy-initial-state).

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

In the example above, the `useState` hook read the value from local storage every time it re-renders. In this case, every time you type with the input box.

As you know, reading from local storage is an IO operation, and it can potentially slow down our application.

> Reading from local storage is just one example. The same potential performance issue apply to any expensive function you passed to `useState`.

The argument you pass to `useState` is supposed to be the initial value of the state. So, why is it that the function you passed need to re-run on every subsequent re-render? Is this React's bug?

The answer is "No". The culprit here is Javascript itself.

When your component re-renders, your function is parsed and executed again. When Javascript parses your component, it'll run the function you passed as argument, get its value, and passes it to `useState` again, which is then ignored correctly by React.

As you can see, the problem occurred before you even reach the React land.

So, how do we prevent Javascript from executing our function? **Anonymous function** to the rescue.

It's just like passing an arrow function that executes your function instead of passing your function directly to event handlers when your function has argument.

```jsx
<button onClick={() => setValue(3)} />
```

Instead of

```jsx
<button onClick={setValue(3)} /> // this will error, because the function executes too early
```

The same principle comes into play here. In this case though, it's called **lazy initialization**.

When the Javascript parser see an anonymous function, it won't try to get its value. So your function argument to `useState` will truly only run once (on initial render, by React).

To fix the example above:

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

Instead of passing the initial value directly to the `useState` hook, we passed in an anonymous function that returns the initial value instead.

Now, the `useState` hook will only get the value from local storage on initial render. Which is really what we want it to do.

## Wrap Up

This is a good performance optimization technique to use whenever the initial value for our `useState` hook is an expensive computation.

Hope you find it useful 👍🏻.
