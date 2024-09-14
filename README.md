# React Magic Cursor

<p align="center">
<img src="https://img.shields.io/badge/license-MIT-green" alt="License" />
<a href="https://www.npmjs.com/package/react-magic-cursor">
<img src="https://img.shields.io/npm/v/react-magic-cursor.svg" alt="Build Status" /></a>
<a href="https://github.com/prettier/prettier">
<img src="https://img.shields.io/codecov/c/github/nicodos/react-magic-cursor" /></a>
<a href="https://github.com/prettier/prettier">
<img src="https://img.shields.io/badge/styled_with-prettier-ff69b4.svg" /></a>
</p>

A cursor that follows your mouse and adapt its size, shape and color based on the hovered element.

## Live Demo

[See a real life example](https://sweetpotato.fr/)

## Install

Depending on the package manager you are using for your project, use `npm install` or `yarn add` to include react-magic-cursor in your react app.

```bash
npm install --save react-magic-cursor
```

```bash
yarn add react-magic-cursor
```

## Usage

### Cursor

In your main location, add the MagicCursorProvider and MagicCursor

```jsx
import React from 'react';
import { MagicCursor, MagicCursorProvider } from 'react-magic-cursor';

const App = () => {
  return (
    <React.StrictMode>
      <MagicCursorProvider thickness={2}>
        <div className="App">
          <MagicCursor />
          <Page />
        </div>
      </MagicCursorProvider>
    </React.StrictMode>
  );
};
```

#### Options

| Prop        | Type   | Description             | Default |
| ----------- | ------ | ----------------------- | ------- |
| `thickness` | number | thickness of the cursor | `1`     |

This will add the cursor that follow the mouse.

### Element

In order to interact with yours elements, you need to englobe them with the `<MagicElement />` component.

```jsx
import { MagicElement } from 'react-magic-cursor';

const Page = () => {
  return (
    <>
      <MagicElement type="outline" color="#ff0066" offset={5}>
        <button>Click me!</button>
      </MagicElement>

      <MagicElement type="underline" color="#ff0066">
        <a href="#">Follow me!</a>
      </MagicElement>
    </>
  );
};
```

#### Options

| Prop     | Type   | Description              | Default   |
| -------- | ------ | ------------------------ | --------- |
| `type`   | string | `outline` or `underline` | `outline` |
| `offset` | number | can be negative          | `0`       |
| `color`  | string | hex value                | `#000000` |

### Contribute

- Run the package locally

```bash
npm run dev
```

Visit http://localhost:5173/

- Test the package in another project

```bash
npm run build && npm run pack
```

Then in your project's package.json file, add (refer to the current version in `./package.json):

```
"react-magic-cursor": "~/react-magic-cursor-0.1.5.tgz"
```

If you have a feature request, please add it as an issue or make a pull request.

Cheers!
