---
datetime: 2022-09-02T05:15:27.000Z
title: Understanding JavaScript Function As First-class Citizen
description: "A short post explaining the meaning of JavaScript function as a first-class citizen."
tags:
  - javascript
---

## Introduction

We often hear the phrase "Function is a first-class citizen in JavaScript", but what exactly does it mean?

It means that JavaScript _function_ possesses all the capabilities of JavaScript _object_ and is thus treated like any other _object_ in the language. And to be specific:

### Function can be created with literals

```js
function() {}
```

### Function can be assigned to variables, array entries, and properties of other objects

```js
const exampleFunction = function () {}; // assigns to a variable
exampleArray.push(function () {}); // adds to an array
example.data = function () {}; // assigns as a property of another object
```

### Function can be passed as an argument to another _function_

```js
function call(exampleFunction {
    exampleFunction();
}
call(function() {})
```

### Function can be returned from another _function_

```js
function exampleFunction() {
  return function () {};
}
```

### Function can be assigned properties

```js
const exampleFunction = function () {};
exampleFunction.name = "Example";
```

## Wrap Up

Whatever we can do with _object_ in JavaScript, we can also do with _function_. _Function_ is the same as _object_, but with an additional, special capability of being _invokable_. That is, _function_ can be called or invoked in order to perform an action.
