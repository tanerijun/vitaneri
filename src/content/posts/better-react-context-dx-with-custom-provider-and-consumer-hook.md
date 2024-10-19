---
datetime: 2023-01-20T08:43:41.820Z
title: "Better React Context DX With Custom Provider And Consumer Hook"
description: "Abstracting React's Context API using custom provider and consumer hook."
tags:
  - react
  - javascript
---

In this post, we'll take a look at how we can abstract React's context API using custom provider and consumer hook for a better developer experience.

## Introduction

React's Context API is amazing. One of it's use is allowing us to pass data through our component trees without prop drilling, resulting in a much cleaner code.

But do you know that we can make it even better by abstracting the implementation of the context with custom provider and consumer hook?

Let's look at how we can do that.

Assume that we are using React's context API to manage the site's theme.

## Custom Provider

We start by creating a theme context. We export the context because our child components will have to import it to access the context.

```jsx
export const ThemeContext = createContext();
```

Now that we have the context, we can create a custom provider so that we can wrap our app with `ThemeProvider` instead of `ThemeContext.Provider`.

```jsx
import { createContext, useState } from "react";

export const ThemeContext = createContext();

export default ThemeProvider = (props) => {
  const [theme, setTheme] = useState("light");
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const color = theme === "light" ? "#333" : "#FFF";
  const backgroundColor = theme === "light" ? "#FFF" : "#333";

  document.body.style.color = color;
  document.body.style.backgroundColor = backgroundColor;

  return <ThemeContext.Provider value={{ theme, toggleTheme }} {...props} />;
};
```

Assuming that the whole app need to access this context, we can wrap our `<App />` component in `index.ts` like this:

```jsx
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ThemeProvider } from "./ThemeProvider";

ReactDOM.render(
  <ThemeProvider>
    <App />
  </ThemeProvider>,
  document.getElementById("root"),
);
```

## Consumer Hook

Now, let's look at the button component that toggles the site theme. To do that, the button will have to access the `ThemeContext` using React's `useContext` hook.

```jsx
import { useContext } from "react";
import { ThemeContext } from "./ThemeProvider";

export default ToggleThemeBtn() {
  // We can access the context using React's "useContext" hook
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button onClick={toggleTheme}>
      {theme === 'light' ? 'dark' : 'light'} mode
    </button>
  );
};
```

Everything is working properly, we can toggle the site's theme just fine. But the way we are accessing the `ThemeContext` can use some improvement. Instead of `useContext(ThemeContext)`, wouldn't it be better if we can access the site's theme and its toggle function with an API like `useTheme()` instead?

```jsx
const { theme, toggleTheme } = useTheme();
```

To implement this, let's create a custom hook in our `ThemeProvider.jsx` file.

```jsx {1, 5-7}
import { createContext, useContext, useState } from "react";

export const ThemeContext = createContext();

export const useTheme = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
};

export default ThemeProvider = (props) => {
  const [theme, setTheme] = useState("light");
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const color = theme === "light" ? "#333" : "#FFF";
  const backgroundColor = theme === "light" ? "#FFF" : "#333";

  document.body.style.color = color;
  document.body.style.backgroundColor = backgroundColor;

  return <ThemeContext.Provider value={{ theme, toggleTheme }} {...props} />;
};
```

And we also don't have to export `ThemeContext` anymore since that's considered an implementation detail now.

```jsx {3}
import { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

export useTheme = () => {
  const themeContext = useContext(ThemeContext);
  return themeContext;
};

export default ThemeProvider = (props) => {
  const [theme, setTheme] = useState("light");
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const color = theme === "light" ? "#333" : "#FFF";
  const backgroundColor = theme === "light" ? "#FFF" : "#333";

  document.body.style.color = color;
  document.body.style.backgroundColor = backgroundColor;

  return <ThemeContext.Provider value={{ theme, toggleTheme }} {...props} />;
};
```

And finally, in our button component:

```jsx {1, 4}
import { useTheme } from "./ThemeProvider";

export default ToggleThemeBtn() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme}>
      {theme === 'light' ? 'dark' : 'light'} mode
    </button>
  );
};
```

Don't you agree that it's much cleaner now? And of course we can improve the hook even more.

Say that someone use our button outside `ThemeProvider`. When that happens, our app will crash because the context will return `undefined`.

Usually, when accessing the context directly, people will check if the context is `undefined` to tackle this issue.

```jsx {6-8}
import { useContext } from "react";
import { ThemeContext } from "./ThemeProvider";

export default ToggleThemeBtn() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  if (!theme) {
    // handle error
  }

  return (
    <button onClick={toggleTheme}>
      {theme === 'light' ? 'dark' : 'light'} mode
    </button>
  );
};
```

That's indeed a valid solution. But imagine that we have multiple components doing this 🥲.

But with our custom hook solution, we can just handle that inside the hook.

```jsx
export const useTheme = () => {
  const themeContext = useContext(ThemeContext);
  if (!themeContext) {
    throw new Error("ThemeContext is undefined. Make sure to wrap your component with ThemeProvider.");
  }
  return themeContext;
};
```

## Wrap Up

That's it for this post. Hope you can see the appeal of this pattern, creating a custom provider and consumer hook instead of accessing the context directly.
