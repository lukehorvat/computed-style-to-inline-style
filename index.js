function computedToInline(element, recursive) {
  if (!element) {
    throw new Error("Element not specified.");
  }

  if (!(element instanceof HTMLElement)) {
    throw new Error("Specified element is not a valid HTMLElement instance.");
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
