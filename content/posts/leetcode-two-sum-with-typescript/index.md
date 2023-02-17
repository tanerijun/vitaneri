---
author: Vincent Taneri
datetime: 2022-10-08T13:39:18.243Z
title: "LeetCode: Two Sum With TypeScript"
slug: leetcode-two-sum-with-typescript
featured: false
draft: false
tags:
  - leetcode
  - dsa
  - typescript
ogImage:
description: "Going over the LeetCode's Two Sum problem with TypeScript."
---

In this post, we're going to look at LeetCode's Two Sum problem and find the most efficient algorithm to solve the problem.

## Table Of Contents

## Problem

Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.

Example 1:

```
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
```

Example 2:

```
Input: nums = [3,2,4], target = 6
Output: [1,2]
```

Example 3:

```
Input: nums = [3,3], target = 6
Output: [0,1]
```

## Solution

The answer to Two Sum is really easy to come by. But that obvious answer is a trap, it's not the most efficient solution.

I am talking about the brute force method. Something like this:

```ts
function twoSum(nums: number[], target: number): number[] {
  for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j];
      }
    }
  }

  return [];
}
```

Notice that we're using two loops, that's never a good solution. The time complexity will be `O(n2)`. In other words, as the list grow larger and larger, the algorithm is going to be exponentially slower.

We want to try solving this only by looping through the list once, and we can achieve that with the help of a hash map.

```ts
function twoSum(nums: number[], target: number): number[] {
  const map: Map<number, number> = new Map();

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];

    const complementIndex = map.get(complement);
    if (complementIndex !== undefined) {
      return [complementIndex, i];
    }
    map.set(nums[i], i);
  }

  return [];
}
```

Now that we're using a hash map, the time complexity is down to `O(n)` (where `n` represents the length of the array). In the worst case, each element in the array will be visited once before we get our answer.
ß
As for space complexity, it's also `O(n)`. In the worst case, the algorithm will have to put each number from the array into the map.

## Wrap Up

That's it for Two Sum with TypeScript. 🎉

You can also find the code on my [Github](https://github.com/tanerijun/ts-leetcode).
