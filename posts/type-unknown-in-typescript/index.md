---
author: Vincent Taneri
datetime: 2022-10-21T15:06:20.401Z
title: "Type Unknown in TypeScript"
slug: type-unknown-in-typescript
featured: false
draft: false
tags: 
	- typescript
ogImage: 
description: "Exploring one of the primitive types in TypeScript: Unknown"
---

Let's take a look at the `unknown` type in TypeScript. Type `unknown` is a very interesting type that only exist in TypeScript. Let's take a look at how it works.

## Table Of Contents

## Working With Unknown

I always try to use the `unknown` type when I need to use `any`. `unknown` is like a type-safe version of `any`.

Let's see how it is type-safe by looking at some examples.

```ts
let a: any = "a string";
let b: number = 0;
b = a;
```

This code will work even though the actual type of `a` is a string because we defined the type to be `any`. By doing so, TypeScript assumed that we know what we are doing and leave everything in our hands. Which is not good, because as you can see, we just assigned a string to a number. You can see how dangerous the `any` type is.

Let's see how we can make the same code much better using the `unknown` type.

```ts
let a: unknown = "a string";
let b: number = 0;
b = a;
```

This time, the code won't compile. We'll get a complain from TypeScript instead.

```
Type 'unknown' is not assignable to type 'number'
```

This highlight the differences between the `any` type and the `unknown` type. We need to turn the `unknown` type into a definite type before we can assign it.

To assign `a` to `b`, TypeScript needs to know for sure that `a` is of type `number`. The easiest method to achieve that is by casting the `a` variable into a `number`.

```ts {3}
let a: unknown = "a string";
let b: number = 0;
b = <number>a;
```

Or by using type assertion.

```ts {3}
let a: unknown = "a string";
let b: number = 0;
b = a as number;
```

By explicitly casting the `unknown` type like this, the TS compiler will allow us to assign the value. But as you can see, that's still pretty dangerous. The compiler assumed that we know what we are doing, and leave everything to us just like `any`.

The advantage compared with `any` is that we need to do explicit casting ourself. This eliminates the chance of accidental assignment.

For example: since I know that `a` is not a number, I should turn `a` into a number before we assigning it to `b` to prevent bugs.

```ts {3-4}
let a: unknown = "a string";
let b: number = 0;
a = 1;
b = <number>a;
```

An even safer and more recommended way of dealing with `unknown` is by narrowing its type using [type guard](https://vitaneri.com/posts/type-guards-in-typescript/) just like this.

```ts {4-6}
let a: unknown = "a string";
let b: number = 0;

if (typeof a === "number") {
  b = a;
}
```

By using a type guard, the TypeScript compiler will know for sure that the variable is of a certain type within the guard block.

## Wrap Up

That's it for the `unknown` type in TypeScript.

We should always try to use the `unknown` type instead of `any`. The `unknown` type forces us to double-check before using the variable. We are letting the compiler know what type the value of a variable should be when we need to use it. That's why `unknown` is considered a type-safe version of `any`.
