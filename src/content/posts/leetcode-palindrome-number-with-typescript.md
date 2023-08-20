---
datetime: 2022-10-26T05:39:32.062Z
title: "LeetCode: Palindrome Number With TypeScript"
description: "Going over 'Palidrome Number' from Leetcode with Typescript."
tags:
  - leetcode
  - dsa
  - typescript
---

In this post, we're going to solve LeetCode's "Palindrome Number" using TypeScript.

## Problem

Given an integer `x`, return `true` if `x` is palindrome integer.

- For example, `121` is a palindrome while `123` is not.

Example 1:

```
Input: x = 121
Output: true
Explanation: 121 reads as 121 from left to right and from right to left.
```

Example 2:

```
Input: x = -121
Output: false
Explanation: From left to right, it reads -121. From right to left, it becomes 121-. Therefore it is not a palindrome.
```

Example 3:

```
Input: x = 10
Output: false
Explanation: Reads 01 from right to left. Therefore it is not a palindrome.
```

Constraints:

- `-2^31 <= x <= 2^31 - 1`

**Follow up**: Could you solve it without converting the integer to a string?

## Approach

Our aim is to solve this without converting the integer to a string. If you're already familiar with our solution for LeetCode's [Reverse Integer](https://vitaneri.com/posts/leetcode-reverse-integer-with-typescript/), this problem is going to be a breeze because we solved that problem without converting the integer to a string.

But this time, instead of reversing the whole integer, we only have to reverse half of the digits. We can then compare those half, and see if they are the same (palindrome).

And in the case where there are odd numbers of digits in the integer, we can ignore the middle digit because it will always equal to itself.

## Solution

Translating our approach to code:

```ts
function isPalindrome(x: number): boolean {
	if (x < 0 || (x % 10 === 0 && x != 0)) return false;

	let reversed: number = 0;

	while (x > reversed) {
		reversed = reversed * 10 + (x % 10);
		x = Math.trunc(x / 10);
	}

	return reversed === x || Math.trunc(reversed / 10) === x;
}
```

## Wrap Up

That's it for LeetCode's "Palindrome Number" 🎉.

You can also find the code on my [Github](https://github.com/tanerijun/ts-leetcode).
