(function(root, factory) {
  if (typeof define === "function" && define.amd) {
    define([], factory); // AMD.
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(); // CommonJS.
  } else {
    root.computedStyleToInlineStyle = factory(); // Browser.
  }
}(this, function() {
  return function computedStyleToInlineStyle(element, recursive) {
    if (!element) {
      throw new Error("No element specified.");
    }

    if (!(element instanceof Element)) {
      throw new Error("Specified element is not an instance of Element.");
    }

    if (recursive) {
      Array.prototype.forEach.call(element.children, function(child) {
        computedStyleToInlineStyle(child, recursive);
      });
    }

    var computedStyle = getComputedStyle(element, null);
    for (var i = 0; i < computedStyle.length; i++) {
      var property = computedStyle.item(i);
      var value = computedStyle.getPropertyValue(property);
      element.style[property] = value;
    }
  };
}));
