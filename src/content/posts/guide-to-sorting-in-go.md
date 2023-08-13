---
datetime: 2022-11-16T04:03:59.416Z
title: "Guide To Sorting In Go"
tags:
  - go
---

In this post, we're going to take a look at various ways to sort a slice using the `sort` package from Go's standard library.

## Ascending Sort

To sort a slice in ascending order, we can use the `Ints(x)`, `Float64(x)`, and `Strings(x)` from the `sort` package.

Examples:

- Sorting `int`
  ```go
  nums := []int{3, 7, 8, 1, 5, 4}
  sort.Ints(nums)
  fmt.Println(nums) // prints [1 3 4 5 7 8]
  ```
- Sorting `float64`
  ```go
  floats := []float64{3.2, 7.1, 7.9, 1.1, 5.2, 3.9}
  sort.Float64s(floats)
  fmt.Println(floats) // prints [1.1 3.2 3.9 5.2 7.1 7.9]
  ```
- Sorting `string`
  ```go
  strings := []string{"apple", "Banana", "cherry", "Mango", "papaya"}
  sort.Strings(strings)
  fmt.Println(strings) // [Banana Mango apple cherry papaya]
  ```

Notice that `sort.Strings(x)` sort the elements in the string slice based on their Unicode value, that's why all the capital letters come first.

That's how you can sort in ascending order using Go. Pretty easy and convenient right?

But it's not as straightforward when we need anything other than the ascending sort, like sorting the slices in descending order for example.

Let's look at 2 other ways of sorting to solve this problem.

## Sort With Custom Comparator Using sort.Slice

`sort.Slice()` sorts a slice with the provided less function. But what is a less function?

> Less reports whether the element with index i must sort before the element with index j.

The function signature look like this:

```go
less(i, j int) bool
```

Now, back to our example. We can sort the slice in decreasing order this way:

```go
nums := []int{3, 7, 8, 1, 5, 4}
sort.Slice(nums, func(i, j int) bool {
  return nums[i] > nums[j]
})
fmt.Println(nums) // prints [8 7 5 4 3 1]
```

At this point, you should be able to guess how the less function in `sort.Ints` is implemented. [Check it out!](https://cs.opensource.google/go/go/+/go1.19.3:src/sort/sort.go;l=115)

If you actually visit the link, you'll notice a pattern in the built-in sorting functions.

```go
// IntSlice attaches the methods of Interface to []int, sorting in increasing order.
type IntSlice []int
func (x IntSlice) Len() int           { return len(x) }
func (x IntSlice) Less(i, j int) bool { return x[i] < x[j] }
func (x IntSlice) Swap(i, j int)      { x[i], x[j] = x[j], x[i] }

// Float64Slice implements Interface for a []float64, sorting in increasing order,
// with not-a-number (NaN) values ordered before other values.
type Float64Slice []float64
func (x Float64Slice) Len() int { return len(x) }
func (x Float64Slice) Less(i, j int) bool { return x[i] < x[j] || (isNaN(x[i]) && !isNaN(x[j])) }
func (x Float64Slice) Swap(i, j int)      { x[i], x[j] = x[j], x[i] }

// StringSlice attaches the methods of Interface to []string, sorting in increasing order.
type StringSlice []string
func (x StringSlice) Len() int           { return len(x) }
func (x StringSlice) Less(i, j int) bool { return x[i] < x[j] }
func (x StringSlice) Swap(i, j int)      { x[i], x[j] = x[j], x[i] }
```

That's because they're implementing the `sort.Interface` interface. Yes, the interface is called `Interface`.

And that brings us to the final section, sorting using `sort.Sort()`.

## Sorting sort.Interface Using sort.Sort()

This option allow the most customization and is actually the basis of how all the sorting function is the `sort` package work.

For example, `sort.Ints` is actually:

```go
func Ints(x []int) { Sort(IntSlice(x)) }
```

[You can also check the source code.](https://cs.opensource.google/go/go/+/refs/tags/go1.19.3:src/sort/sort.go;l=157)

Now, let's try to understand what the `sort.Sort()` function does.

From the [docs](https://pkg.go.dev/sort#Sort):

```go
func Sort(data Interface)
```

`sort.Sort()` sorts data in ascending order as determined by the `Less` method. It makes one call to `data.Len` to determine n and O(n\*log(n)) calls to `data.Less` and `data.Swap`. The sort is not guaranteed to be stable.

`data.Len`, `data.Less`, `data.Swap` come from the `sort.Interface` interface, which look like this:

```go
type Interface interface {
	// Len is the number of elements in the collection.
	Len() int
	// Less reports whether the element with
	// index i should sort before the element with index j.
	Less(i, j int) bool
	// Swap swaps the elements with indexes i and j.
	Swap(i, j int)
}
```

By implementing `sort.Interface`, we can also call `sort.Sort()` on our collection.

For example, let's create a custom struct that implement the interface:

```go
type Pet struct {
	name string
	kind string
}

type PetSlice []Pet

func (p PetSlice) Len() int {
	return len(p)
}

func (p PetSlice) Less(i, j int) bool {
	return p[i].name < p[j].name // sort in ascending order using the pet's name
}

func (p PetSlice) Swap(i, j int) {
	p[i], p[j] = p[j], p[i]
}
```

Then we can use our custom struct like this:

```go
var myPets PetSlice = []Pet{
  {"luna", "cat"},
  {"hery", "dog"},
  {"dory", "fish"},
}

fmt.Println(myPets) // [{luna cat} {hery dog} {dory fish}]
sort.Sort(myPets)
fmt.Println(myPets) // [{dory fish} {hery dog} {luna cat}]
```

Everytime you call `sort.Sort` on `myPets`, `myPets` will be sorted using the `Less` method as the comparator.

Finally, let's go back to our example about sorting int slice in decrementing order. We can also implement a custom type for that.

```go
type myIntSlice []int

func (s myIntSlice) Len() int {
	return len(s)
}

func (s myIntSlice) Less(i, j int) bool {
	return s[i] > s[j]
}

func (s myIntSlice) Swap(i, j int) {
	s[i], s[j] = s[j], s[i]
}
```

And use it like this:

```go
var nums myIntSlice = []int{3, 7, 8, 1, 5, 4}
sort.Sort(nums)
fmt.Println(nums) // [8 7 5 4 3 1]
```

Of course, we don't always have to declare our variable with our custom type. We can also use type casting for the situation when the data is already there.

Anytime we need to sort an int slice in decreasing order, we can simply type cast it to our custom type.

```go {2}
nums := []int{3, 7, 8, 1, 5, 4}
sort.Sort(myIntSlice(nums))
fmt.Println(nums) // [8 7 5 4 3 1]
```

## Wrap Up

That's it for this post. I hope it serves you well as a quick guide to the `sort` package.
