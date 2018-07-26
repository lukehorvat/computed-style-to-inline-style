var each = Array.prototype.forEach;

function computedStyleToInlineStyle(element, options) {
  if (!element) {
    throw new Error("No element specified.");
  }

  if (!options) {
    options = {};
  }

  if (options.recursive) {
    each.call(element.children, function(child) {
      computedStyleToInlineStyle(child, options);
    });
  }

  var computedStyle = getComputedStyle(element);
  each.call(options.properties || computedStyle, function(property) {
    element.style[property] = computedStyle.getPropertyValue(property);
  });
}

module.exports = computedStyleToInlineStyle;
