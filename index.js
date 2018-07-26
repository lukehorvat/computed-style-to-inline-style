(function(root, factory) {
  if (typeof define === "function" && define.amd) {
    define([], factory); // AMD.
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(); // CommonJS.
  } else {
    root.computedStyleToInlineStyle = factory(); // Browser.
  }
}(this, function() {
  var each = Array.prototype.forEach;

  return function computedStyleToInlineStyle(element, options) {
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
  };
}));
