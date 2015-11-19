# computed-style-to-inline-style [![NPM version](http://img.shields.io/npm/v/computed-style-to-inline-style.svg?style=flat-square)](https://www.npmjs.org/package/computed-style-to-inline-style) [![Build status](http://img.shields.io/travis/ssilab/computed-style-to-inline-style.svg?style=flat-square)](https://travis-ci.org/ssilab/computed-style-to-inline-style)

Convert a HTML element's computed CSS to inline CSS.

Uses [Window.getComputedStyle](https://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle) internally.

## Installation

Install the package with NPM:

```bash
$ npm install computed-style-to-inline-style
```

## Usage

The package exposes a function that accepts a HTML element as an argument. When called, it will iterate through every computed style property of the specified element and redefine it as an inline style. An optional boolean argument can be provided to determine whether the function recursively processes child elements as well (defaults to `false`).

Example:

```javascript
var computedToInline = require("computed-style-to-inline-style");
computedToInline(document.body, true);
```

## Why?

Consider a scenario where you're rendering an SVG element in a HTML document, with its pretty styling defined in external stylesheets:

```html
<svg viewBox="0 0 800 600">...</svg>
```

You then add a link to let users download the SVG as a file:

```html
<a href="data:image/svg+xml;base64,..." download="example.svg">Download</a>
```

To your dismay, you find that none of the SVG's pretty styling is preserved when downloaded to disk! This is because the file lacks the original context in which the SVG element was rendered in the browser and has no reference to those nice external stylesheets you wrote.

As a solution, you use this package to redefine the SVG styling inline, guaranteeing that the element is saved to file with all of its fancy CSS information embedded within:

```javascript
var computedToInline = require("computed-style-to-inline-style");
var svg = getSvgElement();
computedToInline(svg, true);
```
