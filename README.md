# computed-style-to-inline-style [![NPM version](http://img.shields.io/npm/v/computed-style-to-inline-style.svg?style=flat-square)](https://www.npmjs.org/package/computed-style-to-inline-style)

Convert a HTML element's computed CSS to inline CSS.

Uses [Window.getComputedStyle](https://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle) internally.

## Installation

Install the package via npm:

```sh
$ npm install computed-style-to-inline-style
```

Or download it from the unpkg CDN:

```html
<script src="https://unpkg.com/computed-style-to-inline-style"></script>
```

## Usage

Example:

```javascript
const computedStyleToInlineStyle = require("computed-style-to-inline-style");

computedStyleToInlineStyle(document.body, {
  recursive: true,
  properties: ["font-size", "text-decoration"]
});
```

## API

### computedStyleToInlineStyle(element, [options])

A function that iterates through the computed style properties of `element` and redefines them as inline styles.

#### element

An HTML element.

#### options

An (optional) object with any of the following keys defined:

- `recursive` – A boolean indicating whether to recursively process child elements or not. Defaults to `false`.
- `properties` – An array of property names to operate on; all others are filtered out. Defaults to `undefined` (i.e. *every* computed style property is redefined as an inline style).

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
const computedStyleToInlineStyle = require("computed-style-to-inline-style");

computedStyleToInlineStyle(svgElement, { recursive: true });
```
