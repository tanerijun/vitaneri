---
datetime: 2023-12-27T14:47:43.583Z
title: Preserve Case When Working With HTTP Headers in Go
description: A guide on how to bypass the automatic canonicalization of HTTP headers in Go.
tags:
  - go
---

When you're manipulating the HTTP headers with methods like `Set()`, `Add()`, etc., in Go, you'll find that they're automatically canonicalized. Canonicalization converts the first letter and any letter following a hyphen to uppercase, and every other letters to lowercase.

For example:

```go
w.Header().Set("my-api-key", "secret-key")
```

Will be transformed into this:

```
My-Api-Key: secret-key
```

This is caused by Go passing your key through [`CanonicalMimeHeaderKey`](https://pkg.go.dev/net/textproto#CanonicalMIMEHeaderKey) before calling your methods.

This is fine and all as HTTP headers are case-insensitive. But sometimes, you might find yourself in a situation where you're forced to work with case-sensitive headers.

In that case, you can modify the HTTP headers like this:

```go
w.Header()["my-api-key"] = []string{"secret-key"}
```

This is possible because the Header's type is actually `map[string][]string`, meaning it's just a `map` with key of type `string` and value of type `[]string`.
