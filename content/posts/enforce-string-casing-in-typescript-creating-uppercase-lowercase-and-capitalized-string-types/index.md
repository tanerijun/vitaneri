---
datetime: 2023-06-23T11:12:30.743Z
title: "Enforce String Casing in TypeScript: Creating Uppercase, Lowercase, and Capitalized String Types"
slug: enforce-string-casing-in-typescript-creating-uppercase-lowercase-and-capitalized-string-types
featured: false
tags:
  - typescript
description: A little trick to create type that only allow uppercase, lowercase, or capitalized string in Typescript using intrinsic string manipulation types in Typescript.
---

In this post, I'll share a little trick to create type that only allow uppercase, lowercase, or capitalized string in Typescript using intrinsic string manipulation types in Typescript.

What we want to achieve:

```ts
const str: IsUppercase = "hello"; // should error
```

## Intrinsic String Manipulation Types

Before showing the solution, I would like to introduce you to **Intrinsic String Manipulation Types** that're built into Typescript itself.

### Uppercase

This utility type converts each character in the string to the uppercase version.

```ts
type Greeting = "Hello, world";
type ShoutyGreeting = Uppercase<Greeting>; // type ShoutyGreeting = "HELLO, WORLD"
```

### Lowercase

This utility type converts each character in the string to the lowercase version.

```ts
type Greeting = "Hello, world";
type ListlessGreeting = Lowercase<Greeting>; // type ListlessGreeting = "hello, world"
```

### Capitalize

This utility converts _only_ the first character in the string to an uppercase equivalent.

```ts
type Greeting = "hello, world";
type CapitalizedGreeting = Capitalize<Greeting>; // type CapitalizedGreeting = "Hello, world"
```

## Enforcing String Casing

Now, an interesting use case for those helper function is to enforce casing for the `string` type.

Back to our original example, we can implement `IsUppercase` type this way:

```ts
type IsUppercase = Uppercase<string>;
```

and the `str` will error when passed lowercase string

```ts
const a: IsUppercase = "aa"; // Type 'string' is not assignable to type 'Uppercase<string>'
const a2: IsUppercase = "AA"; // OK
```

The same idea apply for both `IsLowercase` and `IsCapitalized` too.

```ts
type IsLowercase = Lowercase<string>;
type IsCapitalized = Capitalize<string>;

const b: IsLowercase = "bB"; // Type 'string' is not assignable to type 'Lowercase<string>'
const b2: IsLowercase = "bb"; // OK

const c: IsCapitalized = "cC"; // Type 'string' is not assignable to type 'Capitalize<string>'
const c2: IsCapitalized = "Cc"; //OK
```

## Wrap Up

That's it for the article, hope you this little trick useful.
