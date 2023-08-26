---
datetime: 2022-10-15T01:35:13.086Z
title: "Enums In TypeScript"
description: "Introduction to Enums in TypeScript."
tags:
  - typescript
---

Enums is a special type whose concept will already be familiar to you if you come from languages like C#, C++, Java, etc.

In this post, we'll look at how enums work in TypeScript, and also how the TypeScript compiler compile enums to plain JavaScript. After all, enums doesn't exist natively in the JavaScript world.

## Enums

Enums are used to define a human-readable name for numbers or strings with specific meaning.

This is how you declare an enums in TypeScript:

```ts
enum ModalState {
	Open,
	Closed,
}
```

Now, let's look at how we can use this enums.

```ts
function checkModalState(state: ModalState) {
	console.log(`Enum's real value is: ${state}`);
	switch (state) {
		case ModalState.Open:
			console.log("Modal is open.");
			break;
		case ModalState.Closed:
			console.log("Door is closed.");
			break;
	}
}
```

So, we start by declaring an enum called `ModalState`. This enum has two possible values, `Open` and `Closed`. We then created a function called `checkModalState` that take a single argument called `state` of type `ModalState`. This means that we can only call this function with one of the values of the `ModalState` enum.

The function logs the actual value of the `state` parameter to the console then executes a `switch` statement. The `switch` statements logs a message to the console depending on the value of the `state` parameter we passed in.

Let's run the function with the following code.

```ts showLineNumbers
checkModalState(ModalState.Open);
checkModalState(ModalState.Closed);
```

The output of this code is as follows:

```
Enum's real value is: 0
Modal is open.
Enum's real value is: 1
Modal is closed.
```

As you can see, the TypeScript compiler has generated a numerical value for all the values in our enum. The value for `ModalState.Open` is `0`, and the value for `ModalState.Closed` is `1`.

Enums eliminates the so called magic numbers by defining a clear possible values. Enums helps us provide a clear set of values for a variable or function parameter. Like in the example above, we can only pass `ModalState.Open` or `ModalState.Closed` to our function.

We can also set the numerical value of an enum to whatever we like. For example:

```ts
enum ModalState {
	Open = 5,
	Closed = 10,
}
```

Now, if we run the `checkModalState` function again.

```ts
checkModalState(ModalState.Open);
checkModalState(ModalState.Closed);
```

We'll get the following output:

```
Enum's real value is: 5
Modal is open.
Enum's real value is: 10
Modal is closed.
```

## Strings Enums

In TypeScript, we are not limited to numeric enums. We can also use a string enum. Let's look at an example.

```ts
enum ModalState {
	OPEN = "Open",
	CLOSED = "Closed",
}
```

Now, let's `console.log()` the value.

```ts
console.log(`OPEN = ${ModalState.OPEN}`);
```

As expected, TypeScript compiler is resolving the enum value to the `Open` string.

```
OPEN = Open
```

String enums don't auto-increment like the numeric enum. You've got to assign a value to all the other enum values the moment you assign a value to one.

```ts
enum modalState {
	OPEN = "open",
	Closed, // TypeScript will complain about this line
}
```

You can also make a heterogenous enums like this, but it's generally not recommended.

```ts
enum modalState {
	OPEN = 1,
	CLOSED = "Closed",
}
```

String enum is particularly useful when we're debugging. Unlike the runtime value of numeric enums, the value of string enums convey a meaningful and readable value that'll make our debugging experience much better.

## Const Enums

When requirements are tight, and our code has to be as minimal as possible, we can use the const enums by adding the `const` keyword before the enum definition.

```ts {1}
const enum ModalState {
	Open,
	Closed,
}
```

Const enum is introduced for performance reasons. The enums are completely removed during compilation.

Before we look at how const enums are implemented in plain JavaScript, let's go back and take a look at the JavaScript implementation of normal enums.

```ts {1}
enum ModalState {
	Open,
	Closed,
}
```

This is how the code above look like after compilation.

```js
var modalState;
(function (modalState) {
	modalState[(modalState["Open"] = 0)] = "Open";
	modalState[(modalState["Closed"] = 1)] = "Closed";
})(modalState || (modalState = {}));
```

Let's ignore the complex-looking JavaScript. The point here is that an object is created by the compiler to represent the enum. If we log the object, we get:

```
{
  "0": "Open",
  "1": "Closed",
  "Open": 0,
  "Closed": 1
}
```

Now, back to const enum. No object is generated at all. They are completely removed during compilation.

```ts
const enum modalState {
	Open,
	Closed,
}

console.log(modalState); // this line will error
```

TypeScript will make this kind of complain if we try to `console.log()` const enum.

```
'const' enums can only be used in property or index access expressions or the right hand side of an import declaration or export assignment or type query.
```

That's understandable because `modalState`, in this case, is completely removed on the compiled JavaScript code. Const enum are inlined at use sites.

To look at the generated JavaScript for a const enum. Let's compile the following code.

```ts
console.log(modalState.Open);
```

Result of compilation:

```js
console.log(0 /* modalState.Open */);
```

As you can see, there is no actual implementation of the enum itself at all. The compiler simply substituted the JavaScript code with the value of the enum and a comment following it (Yes, that comment is generated by the compiler).

This reduce the size of the generated code, and the JavaScript runtime doesn't need to work with a JavaScript object in order to check a value resulting in a better performance.

## Wrap Up

That's it for the basic of the TypeScript enums. Of course there're still lots of detail that you can read on [the official docs](https://www.typescriptlang.org/docs/handbook/enums.html) if you want to understand TypeScript enums even more.
