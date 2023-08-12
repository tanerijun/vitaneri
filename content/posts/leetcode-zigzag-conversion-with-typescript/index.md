---
datetime: 2022-10-23T05:37:15.568Z
title: "LeetCode: Zigzag Conversion With TypeScript"
slug: leetcode-zigzag-conversion-with-typescript
featured: false
tags:
  - leetcode
  - dsa
  - typescript
description: 'My solution to "Zigzag Conversion" from LeetCode with TypeScript.'
---

In this post, we are going to look at my solution to the "Zigzag Conversion" from LeetCode using TypeScript.

## Problem

The string "PAYPALISHIRING" is written in a zigzag pattern on a given number of rows like this: (you may want to display this pattern in a fixed font for better legibility)

```
P   A   H   N
A P L S I I G
Y   I   R
```

And then read line by line: "PAHNAPLSIIGYIR"

Write the code that will take a string and make this conversion given a number of rows:

```
string convert(string s, int numRows);
```

Example 1:

```
Input: s = "PAYPALISHIRING", numRows = 3
Output: "PAHNAPLSIIGYIR"
```

Example 2:

```
Input: s = "PAYPALISHIRING", numRows = 4
Output: "PINALSIGYAHRPI"
Explanation:
P     I    N
A   L S  I G
Y A   H R
P     I
```

Example 3:

```
Input: s = "A", numRows = 1
Output: "A"
```

## Approach

We can forget about all the zigzag stuff and think of the problem as rows of string instead. We simply have to loop through each character and concatenate it to the appropriate string.

For example, the conversion of `"PAYPALISHIRING"` with 3 rows is

```
P   A   H   N
A P L S I I G
Y   I   R
```

The pattern above is the same as (considering that we're going to join them line by line in the end)

```
"PAHN",
"APLSIIG",
"YIR"
```

And finally, we can concatenate the strings and get `"PAHNAPLSIIGYIR"`.

The time complexity of this approach is `O(n)` where `n` equals the length of the input string.

## Solution

Translating our approach to code:

```ts
function convert(s: string, numRows: number): string {
	const resArr: string[] = Array(numRows).fill("");
	let cursor: number = 0;
	let isDecreasing: boolean = false;

	for (let i = 0; i < s.length; i++) {
		resArr[cursor] += s[i];

		if (cursor === 0) {
			isDecreasing = false;
		}

		if (cursor === numRows - 1) {
			isDecreasing = true;
		}

		if (isDecreasing) {
			if (cursor != 0) cursor -= 1;
		} else {
			cursor += 1;
		}
	}

	return resArr.join("");
}
```

## Code Explanation

Let me explain the code:

- We create an array of empty string the size of the number of rows.
- We then create a cursor and a boolean flag to control whether the cursor should be increasing or decreasing.
- We loop through each character in the string.
  - We concatenate the char with the string that the current cursor is pointing at.
  - We adjust the flag if needed.
  - We modify the cursor based on the flag.
    - Note that the cursor shouldn't be a negative number, so we have an additional check before decreasing the cursor.
- We return all the string inside the array joined together.

## Wrap Up

That's it for LeetCode's "Zigzag Conversion" 🎉. The result is also very satisfying.

```
Runtime: 101 ms, faster than 94.46% of TypeScript online submissions for Zigzag Conversion.
Memory Usage: 46.3 MB, less than 98.99% of TypeScript online submissions for Zigzag Conversion.
```

You can also find the code on my [Github](https://github.com/tanerijun/ts-leetcode).
