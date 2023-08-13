---
datetime: 2022-11-14T16:07:52.838Z
title: "Check For Nil Interface In Go"
tags:
  - go
description: "A short code snippet to check for nil interface in Go."
---

The zero value for a Go interface is `nil`. But unlike the `nil` for concrete types (e.g: pointer, slice), checking for `nil` interface is not as straightforward.

In this post, we'll look at how we can check if an interface is `nil` using the `reflect` package.

## The Problem

First, check out the following code snippet:

```go
var a []int
fmt.Println(a == nil) // prints true
var s *string
fmt.Println(s == nil) // prints true
var i interface{}
fmt.Println(i == nil) // prints true
i = s
fmt.Println(i == nil) // prints false
```

The last line will always prints false, and go-staticcheck will give us a warning.

```
this comparison is never true; the lhs of the comparison has been assigned a concretely typed value
```

Under the hood, Go's interfaces are a pair of pointers. One points to the underlying type and one points to the underlying value.

In this case, because we assign a value that's _concretely typed_ to `i`, the interface is no longer `nil`, even though the assigned value is `nil`.

Or to word it a little differently, if a `nil` variable with a concrete type is assigned to a variable with an interface type, the interface type is definitely not `nil`.

> An interface is only considered `nil` when both its type and value are `nil`.

## Solution

To reliably check if the value associated with an interface is `nil`, we need two use the `isValid` and `isNil` methods from `reflection`.

```go
func checkNilInterface(i interface{}) bool {
	iv := reflect.ValueOf(i)
	if !iv.IsValid() {
		return true
	}
	switch iv.Kind() {
	case reflect.Ptr, reflect.Slice, reflect.Map, reflect.Func, reflect.Interface:
		return iv.IsNil()
	default:
		return false
	}
}
```

The `IsValid` check on line 3 returns `true` if `iv` is not a `nil` interface.

Next we check whether the value associated with the interface is `nil` using the `IsNil` method. Note that the `IsNil` method can only be called on a type that can contain `nil`, thence the case statement above it.

## Wrap Up

That's how you can check for `nil` interface in Go. Before we end this post, let's see how the checker function does with our initial example.

```go {7, 10}
var a []int
fmt.Println(a == nil) // prints true
var s *string
fmt.Println(s == nil) // prints true
var i interface{}
fmt.Println(i == nil) // prints true
fmt.Println(checkNilInterface(i)) // prints true
i = s
fmt.Println(i == nil) // prints false
fmt.Println(checkNilInterface(i)) // prints true
```
