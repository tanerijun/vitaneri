---
datetime: 2022-10-24T14:06:23.627Z
title: "LeetCode: Reverse Integer With TypeScript"
description: "Going over 'Reverse Integer' from Leetcode with Typescript."
tags:
  - leetcode
  - dsa
  - typescript
---

In this post, we're going to solve LeetCode's "Reverse Integer" using TypeScript.

## Problem

Given a signed 32-bit integer x, return x with its digits reversed. If reversing x causes the value to go outside the signed 32-bit integer range [-231, 231 - 1], then return 0.

**Assume the environment does not allow you to store 64-bit integers (signed or unsigned).**

Example 1:

```
Input: x = 123
Output: 321
```

Example 2:

```
Input: x = -123
Output: -321
```

Example 3:

```
Input: x = 120
Output: 21
```

Constraints:

```
-231 <= x <= 231 - 1
```

## Approach

We can simply convert the number to string, split it into array of characters, reverse the array, then join them back together. After that we have to multiply the result with -1 if the input is negative.

But the method above is not really efficient as we're doing multiple array's `O(n)` operation.

We can also solve this problem with simple arithmetic. First, it's important to understand this concept:

- You can add a digit to a number by multiplying the number with 10 and adding the digit to the number.
- You can remove the last digit of a number by dividing with 10 and removing the fractional value.

Now, this is how we are going to solve it:

- First, convert the number to positive because it's easier to work with.
- Create a variable to store our result.
- Run a loop until input number is equal to 0.
  - We append the last digit of the input number to our result variable.
  - We remove the last digit from the input number (the input will eventually become 0 this way).
- Multiply the result with -1 if the input number is negative.
- Check if the result exceed the maximum size of signed 32-bit integer, and return the result.

The time complexity for this approach is `O(log(x))`. Because the complexity depends on the number of digits in `x`, and it can roughly be represented with `log(x)`.

## Solution

### Converting To String

```ts
function reverse(x: number): number {
  const reversed = x.toString().split("").reverse().join("");
  const result = parseInt(reversed) * Math.sign(x);

  if (result < Math.pow(-2, 31) || result > Math.pow(2, 31) - 1) return 0;

  return result;
}
```

### Using Arithmetic

```ts
function reverse(x: number): number {
  let input = Math.abs(x);
  let result: number = 0;

  while (input != 0) {
    result = result * 10 + (input % 10);
    input = Math.floor(input / 10);
  }

  result *= Math.sign(x);

  if (result < Math.pow(-2, 31) || result > Math.pow(2, 31) - 1) return 0;

  return result;
}
```

## Wrap Up

That's it for LeetCode's "Reverse Integer" 🎉.

You can also find the code on my [Github](https://github.com/tanerijun/ts-leetcode).
