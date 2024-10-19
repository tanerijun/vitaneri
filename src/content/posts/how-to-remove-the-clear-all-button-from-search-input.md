---
datetime: 2023-07-18T12:04:38.948Z
title: How To Remove The "Clear All" Button From Search Input
description: "A guide on how to remove the clear all button when you set input type to search in HTML."
tags:
  - css
---

When you create a search input, `<input type="search" />`, in HTML. It's going to display a clear all button, usually shaped as a cross ("X"), at the end of the input.

I am talking about this:

![X Icon in Searchbar](~/assets/x-icon-in-searchbar.png)

We can remove the "X" with these CSS:

```css
/* clears the 'X' in searchbar from Internet Explorer */
input[type="search"]::-ms-clear {
  display: none;
  width: 0;
  height: 0;
}

input[type="search"]::-ms-reveal {
  display: none;
  width: 0;
  height: 0;
}

/* clears the 'X' in searchbar from Chrome */
input[type="search"]::-webkit-search-decoration,
input[type="search"]::-webkit-search-cancel-button,
input[type="search"]::-webkit-search-results-button,
input[type="search"]::-webkit-search-results-decoration {
  display: none;
}
```

That's it! Have a good day 😊.
