# computed-style-to-inline-style [![NPM version](http://img.shields.io/npm/v/computed-style-to-inline-style.svg?style=flat-square)](https://www.npmjs.org/package/computed-style-to-inline-style)

Convert a HTML element's computed CSS to inline CSS.

Uses [Window.getComputedStyle](https://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle) internally.

## Installation

Install the package with NPM:

```bash
$ npm install computed-style-to-inline-style
```

## Usage

The package exports a function that accepts a HTML element as an argument. When called, it will iterate through every computed style property of the element and re-define it as an inline style. An optional boolean argument can be specified to determine whether the function recursively processes child elements as well (defaults to `false`).

```javascript
var computedToInline = require("computed-style-to-inline-style");
computedToInline(document.body, true);
```

## Why?

TODO.
