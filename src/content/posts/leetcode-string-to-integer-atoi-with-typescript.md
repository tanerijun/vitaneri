---
datetime: 2022-10-25T13:55:29.989Z
title: "LeetCode: String To Integer (atoi) With TypeScript"
description: "Going over 'String To Integer (atoi)' from Leetcode with Typescript."
tags:
  - leetcode
  - dsa
  - typescript
---

In this post, we're going to solve LeetCode's "String To Integer (atoi)" using TypeScript.

## Problem

Implement the `myAtoi(string s)` function, which converts a string to a 32-bit signed integer (similar to C/C++'s `atoi` function).

The algorithm for `myAtoi(string s)` is as follows:

1. Read in and ignore any leading whitespace.
2. Check if the next character (if not already at the end of the string) is `'-'` or `'+'`. Read this character in if it is either. This determines if the final result is negative or positive respectively. Assume the result is positive if neither is present.
3. Read in next the characters until the next non-digit character or the end of the input is reached. The rest of the string is ignored.
4. Convert these digits into an integer (i.e. `"123" -> 123`, `"0032" -> 32`). If no digits were read, then the integer is `0`. Change the sign as necessary (from step 2).
5. If the integer is out of the 32-bit signed integer range `[-2^31, 2^31 - 1]`, then clamp the integer so that it remains in the range. Specifically, integers less than `-2^31` should be clamped to `-2^31`, and integers greater than `2^31 - 1` should be clamped to `2^31 - 1`.
6. Return the integer as the final result.

**Note:**

- Only the space character `' '` is considered a whitespace character.
- **Do not ignore** any characters other than the leading whitespace or the rest of the string after the digits.

## Approach

Since the algorithm has been given to us, all we need to do is to implement it.

## Solution

```ts
function myAtoi(s: string): number {
  const input: string = s.trimStart();
  let result: number = 0;
  let sign: number | undefined;

  if (input[0] === "+") {
    sign = 1;
  } else if (input[0] === "-") {
    sign = -1;
  }

  let i = sign ? 1 : 0;
  for (; i < input.length; i++) {
    const num = parseInt(input[i]);
    if (num >= 0 && num <= 9) {
      result = result * 10 + num;
    } else {
      break;
    }
  }

  result = sign === -1 ? result * -1 : result;

  const MAX_VAL = Math.pow(2, 31) - 1;
  const MIN_VAL = Math.pow(-2, 31);

  if (result > MAX_VAL) {
    result = MAX_VAL;
  } else if (result < MIN_VAL) {
    result = MIN_VAL;
  }

  return result;
}
```

## Code Explanation

1. Remove leading whitespace from the string.
2. Create a variable to store the result.
3. Create a variable to temporary store whether the input is a positive or negative number.
4. Loop through each characters in the string without forgetting to adjust the starting point according to if the positive or negative sign is available.
   1. Add the char to the result variable if it's a number.
   2. Otherwise, we break the loop.
5. Multiply result with `-1` if the input was a negative number.
6. Clamp the result to the 32-bit signed integer range if it exceeds the range.
7. Return the result.

## Wrap Up

That's it for LeetCode's "String To Integer (atoi)" 🎉.

You can also find the code on my [Github](https://github.com/tanerijun/ts-leetcode).
