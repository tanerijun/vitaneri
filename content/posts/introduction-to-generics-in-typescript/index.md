---
datetime: 2022-10-29T01:58:28.122Z
title: "Introduction To Generics In TypeScript"
slug: introduction-to-generics-in-typescript
featured: false
tags:
  - typescript
description: "A guide on TypeScript's generics."
---

This post is a simple introduction to generics in TypeScript.

## What Is Generics?

Generics is a way of writing code that will work with a wide range of objects and primitives. It's really useful when we want to write codes that will work with any sort of type, interface, or class definition.

For example, a function to find an element in a list where the elements can be strings, numbers, or any other type. Or maybe you have a Queue class that need to work with any type of primitive. These scenarios are when we need to use generics.

## Basic Syntax

Let's first look at a code snippet that uses generics.

```ts
function print<T>(val: T) {
	console.log(`typeof T is: ${typeof val}`);
	console.log(`value is: ${val}`);
}
```

Here, we have a function called `print` that is using generics. The function take an argument called `val` of type `T`.

**Note** that the `T` is only a convention. You can name it whatever you want.

Let's see how it works when we call the function with arguments of different type.

```ts
print<number>(1);
print<string>("hello");
print<boolean>(true);
print<function>(() => {});
print<object>({ name: "John" });
```

And the output:

```
typeof T is: number
value is: 1
typeof T is: string
value is: hello
typeof T is: boolean
value is: true
typeof T is: function
value is: function () {}
typeof T is: object
value is: [object Object]
```

As you can see, the function works with every type. All we have to do is specify a type inside the angle brackets, then all `T` inside the function will be replaced with that type.

Take `print<number>()` for example. All `T` that appear inside the function will be replaced with `number`.

```ts
function print(val: number) {
	console.log(`typeof T is: ${typeof val}`);
	console.log(`value is: ${val}`);
}
```

And if we give an argument that's not a number, we'll get an error.

For example, if we run `print<number>("hello")`. We'll get the following error.

```
Argument of type 'string' is not assignable to parameter of type 'number'.
```

Typescript prevents us from calling a generic function with the wrong type as an argument.

**Note** that we don't need to explicitly specify the type the function takes. It can be inferred. For example the code below will still work as expected.

```ts
print(1);
print("hello");
print(true);
print(() => {});
print({ name: "John" });
```

## Multiple Generics

We are not limited to one generic in TypeScript. We can use as many as we needs.

For example:

```ts
function twoTypes<A, B>(arg1: A, arg2: B) {
	console.log(`Type of the first argument is: ${typeof arg1}`);
	console.log(`Type of the second argument is: ${typeof arg2}`);
}
```

Here, we have a function that take 2 generic types. Let's see how it works using the code below.

```ts
twoTypes<number, string>(1, "hello");
twoTypes(2, "world");
twoTypes("hello", "world");
```

Notice that the 2 generics can also be of the same type as shown at line 3.

```
Type of the first argument is: number
Type of the second argument is: string
Type of the first argument is: number
Type of the second argument is: string
Type of the first argument is: string
Type of the second argument is: string
```

## Type Constraint

You can see how powerful generics is from the examples above. Our generic function now works with any type. But usually, we want to only allow a specific set of types to be used within our generic. We can accomplish this by constraining the type using the `extends` keyword.

For example:

```ts
function takeArray<T extends Array<string> | Array<number>>(items: T) {}
```

Now we are constraining the `T` on the function above to either `Array<string>` or `Array<number>`. This means that whatever `T` is used within our code, it can only be interpreted as either an array of string or an array of number.

If we try to call the function with array of boolean, `takeArray([true, false])`, we'll get the following error.

```
Type 'boolean' is not assignable to type 'string | number'.
```

**Note** that `Array<T>` is a predefined type from the standard TypeScript [type definitions](https://github.com/microsoft/TypeScript/blob/main/lib/lib.es5.d.ts).

## Generic Constraints

We can also construct a generic type from another generic type.

For example:

```ts
function printProperty<T, K extends keyof T>(obj: T, key: K) {
	console.log(`obj[${key}] = ${obj[key]}`);
}
```

Here, our function take two generic types, `T` and `K`. The type `K` is constrained to be the value computed from the `keyof` operator on type `T`.

The `keyof` operator will return a string literal type of the object's properties. Therefore `K` will be constrained to the property names of the type `T`.

Let's look at an example.

```ts
const obj = {
	id: 1,
	name: "John",
};

printProperty(obj, "id");
printProperty(obj, "name");
printProperty(obj, "age");
```

The first and second line of the code will produce the following output as expected:

```
obj[id] = 1
obj[name] = John
```

But the third line will result in an error because the property `age` doesn't exist on type `keyof T` which is extended by type `K`.

```
Argument of type '"age"' is not assignable to parameter of type '"id" | "name"'.
```

## Creating A New Object Within Generics

There might be a time when we need to create a factory function that return an instance of a class.

For example:

```ts
class Fish {}

function createClassInstance<T>(arg: T): T {
	return new arg();
}

let instanceOfFish = createClassInstance(Fish);
```

Surprisingly, the code above results in the following error.

```
This expression is not constructable.
  Type 'unknown' has no construct signatures.
```

This is happening because the name of `T` only exists at compile time. We can use `T` for type checking but not for constructing an object of type `T` unless we have access to the constructor.

In order to fix the code above, we need to refer to type `T` by its constructor function.

```ts {3}
class Fish {}

function createClassInstance<T>(arg: { new (): T }): T {
	return new arg();
}

let instanceOfFish = createClassInstance(Fish);
```

With this change, our code will now compile and work as expected.

## Wrap Up

That's it for the introduction to generics in TypeScript 🎉.

Having a good understanding of generics is really important to use the more advanced TypeScript features like [Mapped Types](understanding-mapped-types-in-typescript)), Conditional Types, etc.
