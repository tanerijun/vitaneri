---
datetime: 2022-10-21T08:18:28.861Z
title: "LeetCode: Longest Substring Without Repeating Characters With TypeScript"
slug: leetcode-longest-substring-without-repeating-characters-with-typescript
featured: false
tags:
  - leetcode
  - dsa
  - typescript
description: 'Going over "Longest Substring Without Repeating Characters" from LeetCode with TypeScript.'
---

This is my solution to "Longest Substring Without Repeating Characters" from LeetCode with TypeScript.

## Problem

Given a string `s`, find the length of the longest substring without repeating characters.

Example 1:

```
Input: s = "abcabcbb"
Output: 3
Explanation: The answer is "abc", with the length of 3.
```

Example 2:

```
Input: s = "bbbbb"
Output: 1
Explanation: The answer is "b", with the length of 1.
```

Example 3:

```
Input: s = "pwwkew"
Output: 3
Explanation: The answer is "wke", with the length of 3.
Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.
```

## Approach

To solve this problem efficiently. We have to use the sliding window algorithm, otherwise we'll have to deal with nested loops and our runtime complexity will increase exponentially. This algorithm, on the other hand, allows us to solve this problem in `O(n)` time complexity.

These are the steps that we'll take to solve this problem:

- Create a variable to store our result (longest substring without repetition).
- Create a hash map to store our char with its index.
- Loop through all the characters in the string with 2 hands (`i`, `j`).
  - Check if the character already exist in the map.
  - If it already exist:
    - We slide our left hand (`i`) to the current index of the char.
    - But we need to compare it with its current value, and only update if the index of the duplicated char is larger than the current value of `i` (more on this below).
  - If it doesn't exist yet:
    - We add the character with its index to the map.
    - We also slide our right hand (`j`) 1 step to the right.
    - We update our result, which is the maximum of its current value and the range between the left hand and the right hand (`j - i + 1`).
- Return the result variable.

## Solution

Translating our approach to code:

```ts
export function lengthOfLongestSubstring(s: string): number {
  let res = 0;
  const map = new Map<string, number>();

  for (let i = 0, j = 0; j < s.length; j++) {
    const char = map.get(s[j]);
    if (char) {
      i = Math.max(char, i);
    }
    map.set(s[j], j + 1);
    res = Math.max(res, j - i + 1);
  }

  return res;
}
```

## Bonus

Why do we need to compare the current value of `i` in line 8 before updating it to the index of the duplicated char? Shouldn't `i = char` suffice?

The reason I want to talk about this is because I stumbled upon a bug on my first try because I did that. I wrote my code like this.

```ts {8}
export function lengthOfLongestSubstring(s: string): number {
  let res = 0;
  const map = new Map<string, number>();

  for (let i = 0, j = 0; j < s.length; j++) {
    const char = map.get(s[j]);
    if (char) {
      i = char;
    }
    map.set(s[j], j + 1);
    res = Math.max(res, j - i + 1);
  }

  return res;
}
```

If you're like me, you might find the explanation below helpful.

To see the bug produced by this code, let's track how the loop run if the input string is `"abba"`.

- Loop 1 add `a` to map because the char doesn't exist yet. Our `i` is 0 and our result is 1.
- Loop 2 add `b` to map because the char doesn't exist yet. Our `i` is 0 and our result is now 2.
- Loop 3 found that `b` already exist in our map. So we assign the index of `b` which is 1 to `i`. Our `i` is now 1, and our result is now 2. (Correct behaviour)
- Loop 4 found that `a` already exist in our map. So we move our `i` to the index of `a` which is 0. Our `i` is now back to 0 and our result is now 3. (`i` shouldn't move back to the left)

Now you get why we need `Math.max` there. Both our `i` and `j` should only move to the right, getting closer and closer to the end of the input string.

## Wrap Up

That's it for LeetCode's "Longest Substring Without Repeating Characters" 🎉.

You can also find the code on my [Github](https://github.com/tanerijun/ts-leetcode).
