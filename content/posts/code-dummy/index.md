---
author: Vincent Taneri
datetime: 2023-01-23T15:51:52.609Z
title: 'Code Dummy'
slug: code-dummy
featured: false
draft: false
tags:
  - javascript
  - react
ogImage:
description: 'Code dummy to test syntax highlighting.'
---

## No line highlight

```jsx
import * as React from "react"
import Graph from "./Components/Graph"

export default function Toggle {
  const [showGraph, setShowGraph] = React.useState(false)

  return (
    <Switch
      on={showGraph}
      onClick={() => setShowGraph(!showGraph)}
    />
    <div>
      { showGraph ? <Graph /> : null}
    </div>
  )
}
```

## Highlight line 3

```jsx {3}
import * as React from "react"

const Graph = React.lazy(() => import("./Components/Graph"))

export default function Toggle {
  const [showGraph, setShowGraph] = React.useState(false)

  return (
    <>
      <Switch
        on={showGraph}
        onClick={() => setShowGraph(!showGraph)}
      />
      <div>
        { showGraph ? <Graph /> : null}
      <div>
    </>
  )
}
```

## Highlight line 15 and 17

```jsx {15, 17}
import * as React from "react"

const Graph = React.lazy(() => import("./Components/Graph"))

export default function Toggle {
  const [showGraph, setShowGraph] = React.useState(false)

  return (
   <>
      <Switch
        on={showGraph}
        onClick={() => setShowGraph(!showGraph)}
      />
      <div>
        <React.Suspense>
          { showGraph ? <Graph /> : null}
        </React.Suspense>
      <div>
    </>
  )
}
```

## Highlight line 2 and 17

```jsx {2, 17}
import * as React from "react"
import LoadingIndicator from "./Components/LoadingIndicator"

const Graph = React.lazy(() => import("./Components/Graph"))

export default function Toggle {
  const [showGraph, setShowGraph] = React.useState(false)

  return (
   <>
      <Switch
        on={showGraph}
        onClick={() => setShowGraph(!showGraph)}
      />
      <div>
        <React.Suspense fallback={<LoadingIndicator />}>
          { showGraph ? <Graph /> : null}
        </React.Suspense>
      <div>
    </>
  )
}
```

## Highlight line 10 to 14

```jsx {11-15}
import * as React from "react"
import LoadingIndicator from "./Components/LoadingIndicator"

const Graph = React.lazy(() => import("./Components/Graph"))

export default function Toggle {
  const [showGraph, setShowGraph] = React.useState(false)

  return (
   <>
      <Switch
        on={showGraph}
        onClick={() => setShowGraph(!showGraph)}
        onMouseEnter={() => import("./Components/Graph")}
      />
      <div>
        <React.Suspense fallback={<LoadingIndicator />}>
          { showGraph ? <Graph /> : null}
        </React.Suspense>
      <div>
    </>
  )
}
```

## With title

```jsx title="Graph.tsx"
import * as React from "react"
import LoadingIndicator from "./Components/LoadingIndicator"

const loadGraph = () => import("./Components/Graph")
const Graph = React.lazy(loadGraph)

export default function Toggle {
  const [showGraph, setShowGraph] = React.useState(false)

  return (
   <>
      <Switch
        on={showGraph}
        onClick={() => setShowGraph(!showGraph)}
        onMouseEnter={loadGraph}
      />
      <div>
        <React.Suspense fallback={<LoadingIndicator />}>
          { showGraph ? <Graph /> : null}
        </React.Suspense>
      <div>
    </>
  )
}
```

## With title and highlighting

```jsx {4, 11-15} title="Graph.tsx"
import * as React from "react"
import LoadingIndicator from "./Components/LoadingIndicator"

const loadGraph = () => import("./Components/Graph")
const Graph = React.lazy(loadGraph)

export default function Toggle {
  const [showGraph, setShowGraph] = React.useState(false)

  return (
   <>
      <Switch
        on={showGraph}
        onClick={() => setShowGraph(!showGraph)}
        onMouseEnter={loadGraph}
      />
      <div>
        <React.Suspense fallback={<LoadingIndicator />}>
          { showGraph ? <Graph /> : null}
        </React.Suspense>
      <div>
    </>
  )
}
```

## Show line numbers no highlight

```jsx showLineNumbers
import * as React from "react"

const Graph = React.lazy(() => import("./Components/Graph"))

export default function Toggle {
  const [showGraph, setShowGraph] = React.useState(false)

  return (
   <>
      <Switch
        on={showGraph}
        onClick={() => setShowGraph(!showGraph)}
      />
      <div>
        <React.Suspense>
          { showGraph ? <Graph /> : null}
        </React.Suspense>
      <div>
    </>
  )
}
```

## Show line numbers highlight line 15 and 17

```jsx showLineNumbers {15, 17}
import * as React from "react"

const Graph = React.lazy(() => import("./Components/Graph"))

export default function Toggle {
  const [showGraph, setShowGraph] = React.useState(false)

  return (
   <>
      <Switch
        on={showGraph}
        onClick={() => setShowGraph(!showGraph)}
      />
      <div>
        <React.Suspense>
          { showGraph ? <Graph /> : null}
        </React.Suspense>
      <div>
    </>
  )
}
```

## Show line numbers with different starting point

```jsx showLineNumbers{60}
import * as React from "react"

const Graph = React.lazy(() => import("./Components/Graph"))

export default function Toggle {
  const [showGraph, setShowGraph] = React.useState(false)

  return (
   <>
      <Switch
        on={showGraph}
        onClick={() => setShowGraph(!showGraph)}
      />
      <div>
        <React.Suspense>
          { showGraph ? <Graph /> : null}
        </React.Suspense>
      <div>
    </>
  )
}
```

## Show line numbers with title

```jsx showLineNumbers {15, 17} title="Graph.tsx"
import * as React from "react"

const Graph = React.lazy(() => import("./Components/Graph"))

export default function Toggle {
  const [showGraph, setShowGraph] = React.useState(false)

  return (
   <>
      <Switch
        on={showGraph}
        onClick={() => setShowGraph(!showGraph)}
      />
      <div>
        <React.Suspense>
          { showGraph ? <Graph /> : null}
        </React.Suspense>
      <div>
    </>
  )
}
```
