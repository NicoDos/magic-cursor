# Magic Cursor

A cursor that follows your mouse and adapt its size shape and color based on the hovered element.

There are two behaviours:

- The cursor outlines the element
- The cursor underlines the element

## Quickstart

### Install package from npm

`npm i react-magic-cursor`

### Setup

In your main location, add the CursorProvider and Cursor

```
import React from "react";
import { Cursor, CursorProvider } from "react-magic-cursor"

export default function App() {
  return (
    <React.StrictMode>
        <CursorProvider>
            <div className="App">
                <Cursor />
                <Page />
            </div>
        </CursorProvider>
  </React.StrictMode>
  );
}
```

This will add the cursor that follow the mouse.
In order to interact with the elements, you need to englobe them with the `<Magnet/>` component.

<br/>

## Props

| Prop     | Type   | Description          | Default   |
| -------- | ------ | -------------------- | --------- |
| `type`   | string | outline or underline | `outline` |
| `offset` | string | number               | `0`       |
| `color`  | string | hex value            | `#000000` |

`Magnet` takes a prop `type` which can be either `outline` or `underline`.
It also takes a prop `color` which need to be a HEX Color.

```
import { Magnet } from "react-magic-cursor"

export default function Page() {
  return (
    <Magnet type="outline" color="#ff0066">
        <button>
            Click me!
        </button>
    </Magnet>

    <Magnet type="underline" color="#ff0066">
        <a href="#">
            Follow me!
        </a>
    </Magnet>
  );
}
```

Commits are of course welcome! 😄

Cheers!
