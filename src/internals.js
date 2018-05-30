/**
 * Checks that the argument is a passable Element.
 * @param  {Element} el something with a style method and children
 * @throws {TypeError} if the argument can't pass as an element.
 */
export function check(el){
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
export function getAllPropertyNames(styleDeclaration){
  return Array.from(styleDeclaration);
}
/**
 * Return {[propertyName]: propertyValue} for each of the passed property names
 * in the passed style declaration.
 * @param  {CSSStyleDeclaration} styleDeclaration
 * @param  {String[]} names style property names
 * @return {Object} {[propertyName]: propertyValue}
 */
const asObject = (styleDeclaration, names) => (
  names|| getAllPropertyNames(styleDeclaration)
)
  .map((name) => ({[name]: styleDeclaration.getPropertyValue(name)}))
  .reduce(toObject, {});
/**
 * Return {[propertyName]: propertyValufe} for each of the passed property names
 * @param  {Element} el
 * @param  {Array?} properties [description]
 * @return {Object} {[propertyName]: propertyValue}
 */
export function computeStyle(el, properties){
  const computed = window.getComputedStyle(el);
  if (!properties) properties = getAllPropertyNames(computed);
  return asObject(computed, properties);
}
