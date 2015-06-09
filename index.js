"use strict";

function computedToInline(element, recursive) {
  if (!element) {
    throw new Error("No element specified.");
  }

  if (!(element instanceof Element)) {
    throw new Error("Specified element is not an instance of Element.");
  }

  if (recursive) {
    [].forEach.call(element.children, function(child) {
      computedToInline(child, recursive);
    });
  }

  var computedStyle = getComputedStyle(element, null);
  for (var i = 0; i < computedStyle.length; i++) {
    var property = computedStyle.item(i);
    var value = computedStyle.getPropertyValue(property);
    element.style[property] = value;
  }
}

module.exports = computedToInline;
