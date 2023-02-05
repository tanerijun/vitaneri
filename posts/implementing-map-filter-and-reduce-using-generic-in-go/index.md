---
author: Vincent Taneri
datetime: 2022-11-15T08:25:07.215Z
title: "Implementing Map, Filter, And Reduce Using Generic In Go"
slug: implementing-map-filter-and-reduce-using-generic-in-go
featured: false
draft: false
tags:
  - go
ogImage:
description: "An implementation of map, filter, and reduce using Go's generic."
---

This is a short post showing an implementation of map, filter, and reduce using generic in Go.

## Table Of Contents

## Map

Map creates a new slice and populates it with the results of calling the provided function on every element in input slice.

```go
func Map[T1, T2 any](s []T1, f func(T1) T2) []T2 {
	r := make([]T2, len(s))
	for i, v := range s {
		r[i] = f(v)
	}
	return r
}
```

Usage example:

```go
nums := []int{1, 2, 3, 4, 5}
numsDoubled := Map(nums, func(n int) int {
  return n * 2
})
fmt.Println(numsDoubled) // prints [2 4 6 8 10]
```

## Filter

Filter returns a new slice that contains elements from the input slice which return `true` when they're passed as a parameter to the provided testing function.

```go
func Filter[T any](s []T, f func(T) bool) []T {
	var r []T
	for _, v := range s {
		if f(v) {
			r = append(r, v)
		}
	}
	return r
}
```

Usage example:

```go
nums := []int{1, 2, 3, 4, 5}
evenNums := Filter(nums, func(n int) bool {
	return n%2 == 0
})
fmt.Println(evenNums) // prints [2 4]
```

## Reduce

Reduce runs a reducer function (the provided function) over all elements in the array, in ascending-index order, and accumulates them into a single value.

Every time, the return value of the reducer function is passed again to the next invocation of the function as the accumulator. Reduce returns the final value of the accumulator.

```go
func Reduce[T1, T2 any](s []T1, accumulator T2, f func(T2, T1) T2) T2 {
	r := accumulator
	for _, v := range s {
		r = f(r, v)
	}
	return r
}
```

Usage example:

```go
nums := []int{1, 2, 3, 4, 5}
sumOfNums := Reduce(nums, 0, func(acc, n int) int {
	return acc + n
})
fmt.Println(sumOfNums) // prints 15
```

## Wrap Up

That's how we can implement map, filter, and reduce in Go. We can use these function just like how we use them in Python, JavaScript, Dart, Java, etc.
