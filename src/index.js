import {
  getAllPropertyNames,
  computeStyle,
  check,
} from './internals';
/* eslint no-undef: 2*/
/**
 * Compute all styles applying to an element in the DOM.
 * @func
 * @param  {Element} element
 * @param  {Object} options
 * options.recursive whether to inline all child styles as well.
 * options.properties default all properties
 * @return {Map} elements => style objects
 */
export function computedStyles(element, options) {
  let {recursive, properties} = (options || {});
  recursive = Boolean(recursive);
  let toProcess = [element];
  if (recursive) toProcess = [...toProcess, ...element.children];
  if (properties && properties.match(/all/i)) {
    // assume all CSSStyleDeclarations will have the same properties.
    properties = getAllPropertyNames(window.getComputedStyle(element));
  }
  return new Map(toProcess.map((el) => [el, computeStyle(el, properties)]));
}

/**
 * Apply the styles to the elements the styles are mapped to.
 * @param  {Map|Array} arr a Map of elements to style objects
 * @return {undefined}
 */
const inline = (arr) => arr.forEach(
  (styleObj, el)=>Object.assign(el.style, styleObj)
);
/**
 * Applies
 * @param  {[type]} element [description]
 * @param  {Object} options [description]
 * @param  {Array} options.properties style property names to include.
 */
export default function computedStyleToInlineStyle(element, options) {
  check(element);
  inline(computedStyles(element, options));
}
