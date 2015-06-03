function computedToInline(element) {
  [].forEach.call(element.children, function(child) {
    computedToInline(child);
  });

  var computedStyle = getComputedStyle(element, null);
  for (var i = 0; i < computedStyle.length; i++) {
    var property = computedStyle.item(i);
    var value = computedStyle.getPropertyValue(property);
    element.style[property] = value;
  }
};

module.exports = computedToInline;
