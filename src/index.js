/**
 * Checks that the argument is a passable Element.
 * @param  {Element} el something with a style method and children
 * @throws {TypeError} if the argument can't pass as an element.
 */
const check = (el) => {
  console.log(!el, !el.style, !el.children)
  if (!el || !el.style || !el.children) { // allow stubbing elements
    throw new TypeError(`Invalid element ${el}.`);
  }
};

/**
 * a reducer to gather many objects into one.
 * @param  {Object} acc accumulator
 * @param  {Object} red reducer
 * @return {Object} all key-value pairs in the accumulator and reducer
 */
const toObject = (acc, red) => Object.assign(acc, red);
/**
 * @param  {CSSStyleDeclaration} styleDeclaration
 * @return {String[]}
 */
const getAllPropertyNames = (styleDeclaration) => Array.from(styleDeclaration);
/**
 * Return {[propertyName]: propertyValue} for each of the passed property names
 * in the passed style declaration.
 * @param  {CSSStyleDeclaration} styleDeclaration
 * @param  {String[]} names style property names
 * @return {Object} {[propertyName]: propertyValue}
 */
const asObject = (styleDeclaration, names) => names
  .map(name => ({[name]: styleDeclaration.getPropertyValue(name)}))
  .reduce(toObject);
/**
 * Return {[propertyName]: propertyValufe} for each of the passed property names
 * @param  {Element} el
 * @param  {Array} properties [description]
 * @return {Object} {[propertyName]: propertyValue}
 */
const computeStyle = (el, properties) => {
  return styleValues = asObject(window.getComputedStyle(el), properties);
}
/**
 * Compute all styles applying to an element in the DOM.
 * @param  {Element} element
 * @param  {Object} options
 * @param  {any} options.recursive whether to inline all child styles as well.
 * @param  {String[]?} options.properties default all properties
 * @return {Map} elements => style objects
 */
export function computedStyles(element, options) {
  let {recursive, properties} = (options || {});
  recursive = Boolean(recursive);
  let toProcess = [element];
  if (recursive) toProcess = [...toProcess, ...element.children];
  properties = properties || getAllPropertyNames(window.getComputedStyle(element));
  return new Map(toProcess.map((el) => [el, computeStyle(el, properties)]));
}
/**
 * Apply the styles to the elements the styles are mapped to.
 * @param  {Map|Array<Array(2)>} arr a Map of elements to style objects
 */
const inline = (arr) => arr.forEach(
  ([el, styleObj])=>Object.assign(el.style, styleObj)
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
