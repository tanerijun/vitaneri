---
author: Vincent Taneri
datetime: 2022-09-08T01:15:32.000Z
title: Introduction to Java's Stream API
slug: introduction-to-javas-stream-api
featured: false
draft: false
tags:
  - java
ogImage:
description: "Learn Java's Stream API with examples code. We'll work with a sample data using the Stream API."
---

In this post, we'll learn Java's Stream API by working with a sample data source using the Stream API. By the end of this article, you'll have a basic understanding of the Stream API in Java and what kind of problem it solves.

## Table Of Contents

## Overview

Let's start with the question "What is a stream?".

Stream is basically just a wrapper for a data source that allows you to work with the data declaratively. By using stream, we can process data much faster than when working with it imperatively. Stream makes working with _collection_ much more fun and easier.

First, let's take a look at the data source that we'll be using in our examples. Then we'll compare how to work with the data source using both imperative and declarative methods so that you can see the advantage of using the stream API. After that, we'll take a look at some common operations using stream by answering some questions about the data source, and letting the stream API answer it for us.

> Note: I assume that you know the basic working knowledge of Lambda Expressions, Method Reference, and Optional

## Introducing Our Data Source

First, let's look at the data source we'll be working with throughout the article. We'll be working with a list of `Cat` called `cats`.

Let's first look at how `Cat` is implemented:

```java
public class Cat {

    private String name;
    private int age;
    private String gender;

    public Cat(String name, int age, String gender) {
        this.name = name;
        this.age = age;
        this.gender = gender;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    @Override
    public String toString() {
        return "Cat{" +
                "name='" + name + '\'' +
                ", age=" + age +
                ", gender='" + gender + '\'' +
                '}';
    }
}
```

`Cat` is a very simple object with 3 fields: name, age, and gender. We've also added getters and setters for each field and a `toString()` method that's going to be useful for displaying the result of our operations later.

Next, let's look at the `Main` class. This is where we'll be working throughout the article.

```java
public class Main {

    public static void main(String[] args) {
        List<Cat> cats = List.of(
                new Cat("Bob", 5, "M"),
                new Cat("Coco", 7, "F"),
                new Cat("Amelia", 3, "F"),
                new Cat("Dan", 2, "M")
        );
    }
}
```

For now, it only contains a list of `Cat` called `cats`.

## Working With Data Imperatively

Now, what if I want to create a new list that only contains female cats?

The standard way of doing this, the imperative way, is like this:

```java
List<Cat> femaleCats = new ArrayList<>();

for (Cat cat: cats) {
    if ("F".equals(cat.getGender())) {
        femaleCats.add(cat);
    }
}
```

We just did all these steps:

1. Create a new empty list.
2. Loop through the `cats` list.
3. In the loop, we check if the cat's gender is female (F).
4. If it is, we add the cat to the new list we created.

This is what it looks like if we print `femaleCats`.

```java
Cat{name='Coco', age=7, gender='F'}
Cat{name='Amelia', age=3, gender='F'}
```

## Working With Data Declaratively

And now we'll demonstrate how to work with the data declaratively using the stream API. Working declaratively means that we simply ask the program what we want without the need of specifying each step in detail just like what we did when working imperatively.

This is how we can do the same thing as we did above with the stream API.

```java
List<Cat> femaleCats = cats
                    .stream()
                    .filter(cat -> "F".equals(cat.getGender()))
                    .collect(Collectors.toList());
```

So we start off by calling the `.stream()` method on the collection (`cats`), which returns a `Stream` with the collection as its source. Now we can start working using the stream API. We simply have to ask what we want from the collection.

In this case, we want to filter out the list. We want a new list that only contains female cats. We do it by chaining `.filter()` method. `.filter()` takes a `Predicate`, which is basically just a functional interface that returns a boolean. In our case, we need to pass in `cat -> "F".equals(cat.getGender))`.

The last step is to convert the result of `.filter()` into a `List` because `.filter()` returns a Stream. This is by design, and it's really useful. We can chain the result of our `.filter()` with other methods on the stream API which you will see later.

Now to convert it into a `List` we have to call the method `.collect()`. `.collect()` take a `Collector` as parameter. Since we want our end result to be a `List`, the `Collector` we need to pass in is `Collectors.toList()`.

Finally, we get the same result if we print `femaleCats`.

```java
Cat{name='Coco', age=7, gender='F'}
Cat{name='Amelia', age=3, gender='F'}
```

Do you see the advantage of the declarative approach now? What used to be several lines of code in the imperative mode is now only a line, and the code is much more readable.

The advantage might not be too obvious now as the example was really simple, but it'll become clear how useful it is when we try to do multiple operations by chaining stream methods later in this article.

## Common Operation Using Stream API

Now, let's take a look at some common operations using the stream API.

### forEach

`.forEach()` simply loop over each element in the stream and apply the function you provide to each element.

For example, the code below prints the name of each cat.

```java
cats.stream().forEach(cat -> System.out.println(cat.getName()));
```

Note that `.forEach()` doesn't return a Stream. So you won't be able to chain another method after calling it. This kind of method is also called a terminal method.

### map

`.map()` does the same thing `forEach()` does. That is, applying a function to each element in a Stream. The difference is that `.map()` returns a new Stream, which can be another data type.

Let's look at an example of using `.map()`.

Say, We want to change the gender format of our cat from "M" and "F" to "Male" and "Female" respectively. We can use `.map()` to solve this problem.

```java {3}
List<Cat> newCats = cats
                .stream()
                .map(cat -> new Cat(
                        cat.getName(),
                        cat.getAge(),
                        "F".equals(cat.getGender()) ? "Female" : "Male"))
                .collect(Collectors.toList());
```

And if we print the `newCats`, we get what we want.

```java
Cat{name='Bob', age=5, gender='Male'}
Cat{name='Coco', age=7, gender='Female'}
Cat{name='Amelia', age=3, gender='Female'}
Cat{name='Dan', age=2, gender='Male'}
```

### filter

We already looked at how `.filter()` works before. It returns a new Stream that contains the element from the original Stream that fulfills a condition.

Let's look at another example. Say that we want a new List of cats that are younger than 5.

```java {3}
List<Cat> catYoungerThanFive = cats
                        .stream()
                        .filter(cat -> cat.getAge() < 5)
                        .collect(Collectors.toList());
```

And this is the result of printing `catYoungerThanFive`.

```java
Cat{name='Amelia', age=3, gender='F'}
Cat{name='Dan', age=2, gender='M'}
```

### sorted

We can also sort the list using the `.sorted()` method. The method takes in a `Comparator` as a parameter.

For example, if we want to sort the cats by their age.

```java {3}
List<Cat> newCats = cats
                .stream()
                .sorted(Comparator.comparing(Cat::getAge))
                .collect(Collectors.toList());
```

And this is the result:

```java
Cat{name='Dan', age=2, gender='M'}
Cat{name='Amelia', age=3, gender='F'}
Cat{name='Bob', age=5, gender='M'}
Cat{name='Coco', age=7, gender='F'}
```

You can also reverse it by adding the `.reversed()` method like this:

```java {3}
List<Cat> newCats = cats
                .stream()
                .sorted(Comparator.comparing(Cat::getAge).reversed())
                .collect(Collectors.toList());
```

And this is the result:

```java
Cat{name='Coco', age=7, gender='F'}
Cat{name='Bob', age=5, gender='M'}
Cat{name='Amelia', age=3, gender='F'}
Cat{name='Dan', age=2, gender='M'}
```

### min and max

`.min()` and `.max()` are used to get the minimum and maximum values in a stream. To use the methods, we have to pass in a Comparator.

Note that the `.min()` and `.max()` methods return an Optional because there might not be a result. So you've got to handle that.

Say that we want to find the youngest and the oldest cat from our list. We can that using `.min()` and `.max()` like this:

```java {3, 10}
Optional<Cat> youngestCat = cats
                    .stream()
                    .min(Comparator.comparing(Cat::getAge));
System.out.println(
    "Youngest cat: " + youngestCat.orElseThrow(CatNotFoundException::new)
);

Optional<Cat> oldestCat = cats
                    .stream()
                    .max(Comparator.comparing(Cat::getAge));
System.out.println(
    "Oldest cat: " + oldestCat.orElseThrow(CatNotFoundException::new)
);
```

And this is the result:

```java
Youngest cat: Cat{name='Dan', age=2, gender='M'}
Oldest cat: Cat{name='Coco', age=7, gender='F'}
```

### allMatch, anyMatch, and noneMatch

These operations take a Predicate as a parameter just like `.filter()` and return a boolean.

`.allMatch()` returns true only if all elements in the stream match the Predicate.

```java {3}
boolean allOlderThanFive = cats
                    .stream()
                    .allMatch(cat -> cat.getAge() > 5);
System.out.println("allOlderThanFive = " + allOlderThanFive); // returns false
```

`.anyMatch()` returns true if any one of the elements in the stream matches the Predicate.

```java {3}
boolean anyOlderThanFive = cats
                    .stream()
                    .anyMatch(cat -> cat.getAge() > 5);
System.out.println("anyOlderThanFive = " + anyOlderThanFive); // returns true
```

`.noneMatch()` returns true if none of the elements match the Predicate.

```java {3}
boolean noneOlderThanFive = cats
                    .stream()
                    .noneMatch(cat -> cat.getAge() > 5);
System.out.println("noneOlderThanFive = " + noneOlderThanFive); // returns false
```

### collect

`collect` is a terminal operation that we've been using several times in the examples above. It's the most common way to end a stream and package the elements in the stream into a collection.

Of course, we're not limited to collect into a list like what we did in the examples above. We can collect into any collection we want: map, set, etc.

Let's look at an example of collecting into a map.

Say that I want to group my cats based on their gender. We can do it like this:

```java {3}
Map<String, List<Cat>> catMap = cats
                    .stream()
                    .collect(Collectors.groupingBy(Cat::getGender));
```

Now, if we print the map like this:

```java
catMap.forEach((gender, catsList) -> {
    System.out.println(gender + " cat: ");
    catsList.forEach(System.out::println);
});
```

We'll get this in the console:

```java
F cat:
Cat{name='Coco', age=7, gender='F'}
Cat{name='Amelia', age=3, gender='F'}
M cat:
Cat{name='Bob', age=5, gender='M'}
Cat{name='Dan', age=2, gender='M'}
```

## Chaining Stream Methods

You can also chain multiple stream methods together. Which we have been doing all along in the examples above. But let's look at it again using another example.

Say that I want to create a new List that only contains the name of male cats that are older than 4. We can do it like this:

```java
List<String> newCats = cats
                .stream()
                .filter(cat -> "M".equals(cat.getGender()))
                .filter(cat -> cat.getAge() > 4)
                .map(Cat::getName)
                .collect(Collectors.toList());

newCats.forEach(System.out::println);    // Bob
```

## Wrap Up

That's it for this article. I hope you've got a better understanding of the stream API now. I also hope that you can see how useful and powerful the stream API is, how it allows us to simply ask questions about our collection instead of implementing each step individually using the imperative approach.
