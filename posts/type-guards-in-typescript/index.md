---
author: Vincent Taneri
datetime: 2022-10-14T02:15:52.963Z
title: "Type Guards In TypeScript"
slug: type-guards-in-typescript
featured: false
draft: false
tags: 
	- typescript
ogImage: 
description: "Exploring type guards in TypeScript."
---

## Table Of Contents

## Introduction

When working with union types in TypeScript, we will often come into a situation where we need to use type guard to please the TypeScript compiler. The compiler always apply its strong typing rules to ensure type safety.

Take a look at this code:

```ts
function add(arg1: string | number, arg2: string | number) {
  return arg1 + arg2;
}
```

This is a function that accepts two parameters and returns their sum. The `arg1` and `arg2` parameters are union types. They can hold either a string or a number. Unfortunately, when we try to compile this code, we'll get the following error:

```
error TS2365: Operator '+' cannot be applied to types 'string | number' and 'string | number'
```

The compiler is telling us that it cannot tell what type it should use when it attempts to add `arg1` to `arg2`. Is it supposed to add number to a string, a string to a number, a string to a string, or a number to a number?

In JavaScript, "adding a string and a number" and "adding a number and a number" lead to different results. So the TypeScript compiler won't let us compile before we solve this uncertainties.

This is where type guards come in. Type guard performs a check on our type, and then guarantees that type within its scope.

## Implementing Type Guard

Let's rewrite our `add` function to use type guard.

```ts
function add(arg1: string | number, arg2: string | number) {
  if (typeof arg1 === "string") {
    // arg1 is guaranteed to be a string in this scope
    return arg1 + arg2;
  }

  if (typeof arg1 === "number" && typeof arg2 === "number") {
    // both arg1 and arg2 are guaranteed to be a number in this scope
    return arg1 + arg2;
  }

  // default: return both as strings
  return arg1.toString() + arg2.toString();
}
```

The first if statement uses the JavaScript `typeof` keyword to test `arg1`'s type. If the type is a string, then the compiler knows that within the code block following it, `arg1` is definitely a string, and will therefore treat `arg1` as a string.

The second if statement is similar. We have two `typeof` checks to check whether both `arg1` and `arg2` are of type number. If they are both numbers, then the compiler knows that `arg1` and `arg2` are definitely of type number within the following code block.

Now, let's test the function!

```ts
console.log(`"1" + "2" = ${add("1", "2")}`); // run first if block
console.log(`1 + 2 = ${add(1, 2)}`); // run second if block
console.log(`1 + "2" = ${add(1, "2")}`); // run default
```

The results:

```
"1" + "2" = 12
1 + 2 = 3
1 + "2" = 12
```

## Explanation

We can see that the first call to `add` is using two arguments that are strings. The code identifies the first argument as being of type string and therefore enters the first if statement block. The concatenation of the string "1" with "2" results in the string "12".

The second `add` uses two numbers as arguments, and our code identifies both arguments as numbers, and as such adds the value 1 and the value 2, resulting in 3.

The third `add` uses a number as the first argument and a string as the second. The code therefore falls through to the default code, treating both arguments as strings.
