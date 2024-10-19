---
datetime: 2022-10-27T05:34:34.621Z
title: "LeetCode: Container With Most Water With TypeScript"
description: "Going over `Container With Most Water` from LeetCode with TypeScript."
tags:
  - leetcode
  - dsa
  - typescript
---

In this post, we're going to solve LeetCode's "Container With Most Water" using TypeScript.

## Problem

You are given an integer array height of length `n`. There are `n` vertical lines drawn such that the two endpoints of the ith line are `(i, 0)` and `(i, height[i])`.

Find two lines that together with the x-axis form a container, such that the container contains the most water.

Return the maximum amount of water a container can store.

**Notice** that you may not slant the container.

Example 1:

![example](~/assets/lc11-water-container.jpg)

```
Input: height = [1,8,6,2,5,4,8,3,7]
Output: 49
Explanation: The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water (blue section) the container can contain is 49.
```

Example 2:

```
Input: height = [1,1]
Output: 1
```

## Solution

Let's start by solving the problem with brute force so that it's more apparent why we need the more performant solution.

### Brute Force

For the brute force approach, we just have to calculate all the possibles area from all the line combinations, and get the maximum value.

```ts
function maxArea(height: number[]): number {
  let max: number = 0;

  for (let i = 0; i < height.length; i++) {
    for (let j = i + 1; j < height.length; j++) {
      const w = j - i;
      const h = Math.min(height[i], height[j]);
      max = Math.max(max, w * h);
    }
  }

  return max;
}
```

The time complexity for the brute force approach is `O(n^2)`.

We can surely do better.

### Two Pointers

For this approach, we have two pointers that start off at the edges of the array (the start and the end of the array). We then keep moving the pointers inwards, trying to find the largest area.

```ts
function maxArea(height: number[]): number {
  let max: number = 0;
  let l: number = 0;
  let r: number = height.length - 1;

  while (l < r) {
    const w = r - l;
    const h = Math.min(height[l], height[r]);
    max = Math.max(max, w * h);

    if (height[l] < height[r]) {
      l++;
    } else {
      r--;
    }
  }

  return max;
}
```

If you're not sure why we have to move the shorter line pointer, it's because our calculation is based on it. If we try to move the longer line inwards, there'll be no increase in area. But if we move the shorter line, it might turn into a longer one, so the area will change.

The time complexity for this approach is `O(n)` as we are only going through the array once.

## Wrap Up

That's it for LeetCode's "Container With Most Water" 🎉.

You can also find the code on my [Github](https://github.com/tanerijun/ts-leetcode).
