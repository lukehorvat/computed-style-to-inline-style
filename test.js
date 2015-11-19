var page = require("webpage").create();
page.content = "<html><body><h1 id='test' style='color: red'></h1></body></html>";
page.injectJs("index.js");

var success = page.evaluate(function() {
  var element = document.getElementById("test");

  if (element.style.length !== 1 || element.style[0] !== "color" || element.style["color"] !== "red") {
    throw new Error("Invalid inline style before.");
  }

  computedStyleToInlineStyle(element);

  if (element.style.length <= 1) {
    throw new Error("Invalid inline style after.");
  }

  return true;
});

phantom.exit(success ? 0 : 1);
