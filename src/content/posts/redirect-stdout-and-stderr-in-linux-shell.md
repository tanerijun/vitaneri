---
datetime: 2023-12-28T15:47:37.221Z
title: Redirect STDOUT and STDERR in Linux Shell
description: A guide on redirecting shell's output stream.
tags:
  - linux
---

Unix shells use three standard I/O streams, which are represented by numeric file descriptors:

- `0` - `STDIN` - The standard input stream
- `1` - `STDOUT` - The standard output stream
- `2` - `STDERR` - The standard error stream

By default, both `output` and `error` streams are printed straight to the terminal. But sometimes, we might prefer to redirect them to files for persistence.

## Basic

To redirect the streams to files, we can use the `n>` operator, where `n` is the file descriptor (in this case, either `1` or `2`).

```sh
command 1> file_path
command 2> file_path
```

The first line redirects `STDOUT`, while the second line redirects `STDERR`.

Of course, you can also redirect both `STDOUT` and `STDERR` at the same time by combining the operators.

```sh
command 1> STDOUT.log 2> STDERR.log
```

## Redirecting `STDOUT` and `STDERR` to the Same File

In the case where you need to redirect both `STDOUT` and `STDERR` to the same file, you can use this command.

```sh
command > file_path 2>&1
```

The `2>&1` construct translates to "send the STDERR to the same place you are sending the STDOUT."

Pay attention to the order of redirection above. First, we redirect `STDOUT` to `file_path`, then we redirect `STDERR` to `STDOUT`.

If we do it in reversed order, like `command 2>&1 > file_path`, the command won't work as intended. `STDERR` is redirected to `STDOUT` which is still the terminal screen, then `STDOUT` is redirected to `file_path`.

If you're using `Bash`, the more concise construct `&>` which is equal to `2>&1`.

```bash
command &> file_path
```

## Redirect and Append to File

In the case where you want to append to the end of the file instead of overwriting it, you can use the `>>` operator instead.

```sh
command >> info.log 2>> error.log
```

## Redirect to Another Process

You can also redirect to another process using the pipe (`|`) operator.

```sh
command1 | command2 | command3
```

In this case, the output from `command1` will act as the input for `command2`, and the output from `command2` will also act as the input for `command3`, and so on.

## Redirect to Nowhere

Finally, in the case where you need to redirect to nowhere due to reasons like very huge output, or if you just don't want to see the output, you can redirect to `/dev/null`.

```sh
command > /dev/null
command 2> /dev/null
```

This works because `dev/null` is like the black hole of the Linux file system. Anything you throw there will never see the light again.
