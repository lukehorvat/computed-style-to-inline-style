const { forEach: each } = Array.prototype;

function computedStyleToInlineStyle(element, options = {}) {
  if (!element) {
    throw new Error("No element specified.");
  }

  if (options.recursive) {
    element.children::each(child => {
      computedStyleToInlineStyle(child, options);
    });
  }

  const computedStyle = getComputedStyle(element);
  (options.properties || computedStyle)::each(property => {
    element.style[property] = computedStyle.getPropertyValue(property);
  });
}

module.exports = computedStyleToInlineStyle;
