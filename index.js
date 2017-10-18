(function(root, factory) {
  if (typeof define === "function" && define.amd) {
    define([], factory); // AMD.
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(); // CommonJS.
  } else {
    root.computedStyleToInlineStyle = factory(); // Browser.
  }
}(this, function() {
  return function computedStyleToInlineStyle(element, options) {
    if (!element) {
      throw new Error("No element specified.");
    }

    if (!options) {
      options = {};
    }

    if (options.recursive) {
      Array.prototype.forEach.call(element.children, function(child) {
        computedStyleToInlineStyle(child, options);
      });
    }

    var computedStyle = getComputedStyle(element);
    for (var i = 0; i < computedStyle.length; i++) {
      var property = computedStyle.item(i);
      if (!options.properties || options.properties.indexOf(property) >= 0) {
        var value = computedStyle.getPropertyValue(property);
        element.style[property] = value;
      }
    }
  };
}));
