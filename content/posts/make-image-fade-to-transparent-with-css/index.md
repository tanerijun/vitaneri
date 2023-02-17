---
author: Vincent Taneri
datetime: 2022-09-30T01:15:16.000Z
title: Make Image Fade To Transparent With CSS
slug: make-image-fade-to-transparent-with-css
featured: false
draft: false
tags:
  - css
ogImage:
description: 'Learn how to make image fade to transparent using CSS masking.'
---

In this post, we're going to take a look at how to make an image fade to transparent, or what I like to call _transparent image gradient_ with CSS.

## Table Of Contents

## Example

This is an example of the effect we're trying to achieve.

![Example of image fading into transparent](./assets/transparent-gradient-example.jpeg)

Notice how the bottom part of the image is slowly fading into the background, making it much easier to read the text on top of it.

## Solution

To achieve this effect, we'll need to use CSS masking, the `mask-image` property.

Basically, we're creating a mask layer on top of an image to partially or fully hide portions of the image.

_Note: As of the time of writing this article (September 2022), most browsers only have partial support for CSS masking. So we need to add the `-webkit-` prefix in addition to the standard property in most browsers._

Without further ado, here is the CSS that you need to apply to the image:

```css
.transparent-gradient {
	-webkit-mask-image: linear-gradient(180deg, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
	mask-image: linear-gradient(180deg, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
}
```

You can also fine-tune the gradient direction by changing the first argument, and also the degree of transparency with the second and third arguments, more specifically, the `a` part of `rgba`, which stands for alpha (transparency).

## Wrap Up

That's it 🎉. Hope you find it useful.
