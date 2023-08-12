---
datetime: 2022-10-22T01:51:06.754Z
title: "LeetCode: Longest Palindromic Substring With TypeScript"
slug: leetcode-longest-palindromic-substring-with-typescript
featured: false
draft: false
tags:
  - leetcode
  - dsa
  - typescript
description: 'My solution to "Longest Palindromic Substring" from LeetCode with TypeScript.'
---

In this post, we are going to look at the solution to the "Longest Palindromic Substring" from LeetCode using TypeScript.

## Problem

Given a string `s`, return the longest palindromic substring in `s`.

A string is called a palindrome string if the reverse of that string is the same as the original string.

Example 1:

```
Input: s = "babad"
Output: "bab"
Explanation: "aba" is also a valid answer.
```

Example 2:

```
Input: s = "cbbd"
Output: "bb"
```

## Approach

### Brute Force

First, let's talk about the brute force method. We can loop through each substring and check if it's a palindrome.

To do that:

- Create a variable to hold the longest palindrome string.
- Loop through each character in the string.
  - For each character, we loop through all the characters next to it to get every possible substring.
    - Inside each substring loop, we check whether it's a palindrome string or not.
    - If it is, we check whether it's longer than our current palindrome and replace it if it is indeed longer.
- Return the longest palindrome.

Take the string `"babad"` for example. Running the string through our algorithm will produce a loop like this, and for each loop we're going to check whether it's a palindrome or not.

```
b
ba
bab
baba
babad
a
ab
...
```

To check whether a string is a palindrome, we'll have to loop through each character in the string. Therefore the time complexity is `O(n)`.

The check for each substring is a loop with a nested loop. Therefore the time complexity is `O(n2)`.

If we put everything together, the time complexity is `O(n * n2)`, which is equal to `O(n3)`.

There must be a better way to solve this.

### Expand Around Center

The idea around this is that we'll check for palindrome by thinking of each character in the string as a center point and expanding from it.

Take the string `"babad"` for example.

- First we take the first char `b` as a center point and expand it. We'll get `"*ba"` (`*` means empty) which is not a palindrome.
- Move to the next char `a` and expand it. We'll get `"bab"`, that's a palindrome. Try expanding again, and we get `"*baba"`, not a palindrome. So far the longest palindromic substring is `"bab"`.
- Continue doing this for the rest of the chars.

But wait, there's also an even palindrome. For the string `"cbbd"`, `"bb"` is a valid answer. How are we going to check for this? For this one our other pointer have to be a spot ahead of the other pointer. It's hard to describe with words, but it'll be clear when we look at the code.

The point is that we have to handle 2 separate cases, the odd palindrome and the even palindrome.

By solving the problem this way, the time complexity of our algorithm is going to be much better than the brute-force method. The check for each character is `O(n)` and the expansion from center for each character is also `O(n)`. Therefore our time complexity is `O(n2)`.

## Solution

Translating the approach to code:

```ts
function expandAroundCenter(s: string, l: number, r: number): number {
  while (l >= 0 && r < s.length && s[l] === s[r]) {
    l--;
    r++;
  }

  return r - l - 1;
}

export function longestPalindrome(s: string): string {
  if (s.length <= 1) return s;

  // Keep track of the answer
  let lIdx = 0;
  let rIdx = 0;

  for (let i = 0; i < s.length; i++) {
    let caseOdd = expandAroundCenter(s, i, i); // ex: "babad"
    let caseEven = expandAroundCenter(s, i, i + 1); // ex: "abbd"
    const len = Math.max(caseOdd, caseEven);
    if (len > rIdx - lIdx) {
      lIdx = i - Math.floor((len - 1) / 2);
      rIdx = i + Math.floor(len / 2);
    }
  }

  return s.slice(lIdx, rIdx + 1);
}
```

## Code Explanation

Let's explain the code in more detail.

First, let's start with the `expandAroundCenter()` function.

```ts
function expandAroundCenter(s: string, l: number, r: number): number {
  while (l >= 0 && r < s.length && s[l] === s[r]) {
    l--;
    r++;
  }

  return r - l - 1;
}
```

This part is pretty straightforward, the function simply take the `l` and `r` pointer we passed in, and keep moving them to the left and right respectively until their value is no longer the same or they go out of the string.

The confusing part is probably the return calculation. It might not be obvious for some why the formula for calculating the length of the palindrome is `r - l - 1`.

Let's take the string `"babad"` as an example. When we're on the second loop (`i = 1`), The function is called like this, `expandAroundCenter("babad", 1, 1)`. Now let's jump into the function and see how it executes.

The first while loop will pass as `s[1] === s[1]` is `true`. Our `l` and `r` is now `0` and `2` respectively. At this point our instinct is to calculate the length like this `r - l + 1 = 2 - 0 + 1 = 3` which is correct.

But our loop was executed again. Our `l` and `r` is now `-1` and `3` respectively. Then our while loop stop executing because the condition is no longer `true`. At this point, if we still use this formula `r - l + 1`, we'll get `3 - (-1) + 1 = 5`, which is incorrect. But a point to be noted here is that it give us our length increased by 2.

It make sense why it's `+2`, right? It's because on the final loop, we still decrement `l` by 1 and increment `r` by 1. So to get the correct value, we have to subtract 2 from the answer. `r - l + 1 - 2 = r - l - 1`.

Next, let's talk about the main function.

```ts
export function longestPalindrome(s: string): string {
  if (s.length <= 1) return s;

  // Keep track of the answer
  let lIdx = 0;
  let rIdx = 0;

  for (let i = 0; i < s.length; i++) {
    let caseOdd = expandAroundCenter(s, i, i); // ex: babad
    let caseEven = expandAroundCenter(s, i, i + 1); // ex: abbd
    const len = Math.max(caseOdd, caseEven);
    if (len > rIdx - lIdx) {
      lIdx = i - Math.floor((len - 1) / 2);
      rIdx = i + Math.floor(len / 2);
    }
  }

  return s.slice(lIdx, rIdx + 1);
}
```

- The longest palindrome of a single character string is the string itself. And the longest palindrome of an empty string is just an empty string. Let's handle that first.
- Create two variables to track our answer. (Take `"babad"` as our input. If our answer is `"aba"`, then `lIdx = 1, rIdx = 3`.)
- Loop through each characters in the string.
  - Find the length of the longest palindrome using our `expandAroundCenter()` function.
  - Since we don't know what kind of string we are given, we need to handle all case. (`"babad"` and `"cbbd"` need to be handled differently.)
  - We then find the longest of the two.
  - We update our `lIdx` and `rIdx` if the length is larger than the current value.
- Finally, we return the palindrome substring and don't forget to add 1 to `rIdx` because slice is exclusive.

If the part where we update our `lIdx` and `rIdx` is confusing, we can take a look at an example to make it clear.

Assume that our input string is `"babad"`, and we're now at the second loop (`i = 1`). At this point the value of len is `3`. With 3 as length and `i = 1` as a center. We know that `lIdx` and `rIdx` have to be `0` and `2` respectively in order to produce the string `"bab"`.

To calculate the left index, we need to subtract `i` with `Math.floor((len - 1) / 2)`, and to calculate the right index, we need to add `i` with `Math.floor(len / 2)`. The floor operation is necessary to prevent the division from resulting in floating point number.

## Wrap Up

That's it for LeetCode's "Longest Palindromic String" 🎉.

And if you want to make the algorithm even faster, you can research [The Manacher's Algorithm](https://en.wikipedia.org/wiki/Longest_palindromic_substring#Manacher's_algorithm) for a `O(n)` solution.

You can also find the code from this post on my [Github](https://github.com/tanerijun/ts-leetcode).
