---
author: Vincent Taneri
datetime: 2022-10-29T04:53:41.458Z
title: "Understanding Mapped Types In TypeScript"
slug: understanding-mapped-types-in-typescript
featured: false
draft: false
tags:
  - typescript
ogImage:
description: "Exploring Mapped Types in TypeScript."
---

In this post, we'll look at Mapped Types in TypeScript.

It's recommended that you have a basic understanding of [generics](introduction-to-generics-in-typescript) first before proceeding.

## Table Of Contents

## What Is Mapped Type?

A mapped type is a generic type which uses a union of PropertyKeys (frequently created via `keyof`) to iterate through keys to create a new type.

Mapped type is easier to explain using examples. Say that we have an interface that look like this:

```ts
interface RequireAB {
  a: number;
  b: string;
}
```

Any object that implements the interface must have the `a` and `b` properties.

```ts
const obj: RequireAB = {
  a: 1,
  b: "hello",
};
```

Now, what if we want to make another interface that doesn't require the `a` and `b` properties. We can accomplish it this way.

```ts
interface NotRequireAB {
  a?: number;
  b?: string;
}
```

This look awfully familiar with the `RequireAB` interface above. Can't we just create our `NotRequireAB` based on `RequireAB`? Of course we can, using Mapped Type.

```ts {11-13}
interface RequireAB {
  a: number;
  b: string;
}

const obj: RequireAB = {
  a: 1,
  b: "hello",
};

type NotRequireAB<RequireAB> = {
  [K in keyof RequireAB]?: RequireAB[K];
};

const obj2: NotRequireAB<RequireAB> = {};
```

We created `NotRequireAB` based on `RequireAB`. The type will contain a property for each property in `RequireAB` but with an optional modifier (`?`) next to it. We're basically just creating this code dynamically:

```ts
type NotRequireAB = {
  a?: number;
  b?: string;
};
```

An advantage of using this method to hard-coding is that we don't need to mantain 2 separate types. In the case where we have to add some more properties to `RequireAB`, we don't need to do it for `NotRequireAB` if we created it using mapped type. This will make the code more maintainable.

```ts
interface RequireAB {
  a: number;
  b: string;
  c: boolean;
  d: string | number;
}

// We don't need to do any modification here
type NotRequireAB<RequireAB> = {
  [K in keyof RequireAB]?: RequireAB[K];
};
```

We can make the type even more powerful with generics.

```ts
type WeakInterface<T> = {
  [K in keyof T]?: T[K];
};
```

WeakInterface is a type that take in a type `T` and make all the properties optional.

We can use `WeakInterface` whenever we need to use an interface but with all the properties optional.

```ts
const optional: WeakInterface<RequireAB> = {};
```

Note that we still can't define properties that are not available on the original type.

```ts
const willError: WeakInterface<RequireAB> = {
  c: "test";
}
```

The code above will produce the following error:

```
Type '{ c: string; }' is not assignable to type 'WeakInterface<RequireAB>'.
  Object literal may only specify known properties, and 'c' does not exist in type 'WeakInterface<RequireAB>'.
```

## Adding And Removing Modifiers

We can add or remove modifiers by prefixing them using the `+` or `-` operator.

When no operator is specified, TypeScript will assume that it's `+`. That's why on our `WeakInterface` above, we don't need to specify `+` before our `?` modifier.

Now let's look at an example where we use the `-` operator. Say that we want to make our `WeakInterface` strong again. We can remove all the `?` modifier like this:

```ts
type StrongInterface<T> = {
  [K in keyof T]-?: T[K];
};
```

All we have to do is add the `-` operator before the modifier.

## Introducing Some Predifined Mapped Types

Transforming properties with mapped types is a very common operations that TypeScript provides us with some predifined type definitions.

You can check them out on [lib.es5.d.ts](https://github.com/microsoft/TypeScript/blob/main/lib/lib.es5.d.ts).

In this section, we'll explore some of these type definitions.

### Partial

Partial make all properties of a type optional.

```ts
/**
 * Make all properties in T optional
 */
type Partial<T> = {
  [P in keyof T]?: T[P];
};
```

Our `WeakInterface` we implemented before is actually a Partial.

### Required

Required is the opposite of Partial. It will mark each property as required.

```ts
/**
 * Make all properties in T required
 */
type Required<T> = {
  [P in keyof T]-?: T[P];
};
```

### Readonly

We can use Readonly mapped type to mark each property as readonly (immutable), as follows:

```ts
/**
 * Make all properties in T readonly
 */
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};
```

Readonly is a mapped type that adds a `readonly` property to each properties of the type, making the type immutable.

We can also create a type that remove the `readonly` modifier, and make the properties mutable again.

```ts
type CreateMutable<T> = {
  -readonly [K in keyof T]: T[K];
};
```

Now, Let's look at an example of using Readonly.

```ts
interface RequireAB {
  a: number;
  b: string;
}

const obj: Readonly<RequireAB> = {
  a: 1,
  b: "hello",
};

obj.a = 2;
```

The last line will produce an error as expected.

```
Cannot assign to 'a' because it is a read-only property.
```

### Pick

Pick is used to construct a type based on a subset of properties of another type.

```ts
/**
 * From T, pick a set of properties whose keys are in the union K
 */
type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};
```

Let's look at an example that use Pick.

```ts
interface ABC {
  a: number;
  b: string;
  c: boolean;
}

let obj: Pick<ABC, "a" | "b"> = {
  a: 1,
  b: "hello",
};
```

In `obj`, we only need to specify the properties `a` and `b`. Property `c` doesn't exist on the type generated by Pick.

### Record

Record is used to construct a type on the fly. In a way, it's the opposite of Pick. Record uses a list of properties as a string literal to define what properties the type must have.

```ts
/**
 * Construct a type with a set of properties K of type T
 */
type Record<K extends keyof any, T> = {
  [P in K]: T;
};
```

Let's look at an example that use Record.

```ts
let obj: Record<"c" | "d", string> = {
  c: "hello",
  d: "world",
};
```

The type in our `obj` is created by passing two generic arguments to the Record type. Record then create a new type with the properties of `c` and `d`, both of type string.

## Wrap Up

That's it for Mapped Types 🎉. Hope you find it useful.
