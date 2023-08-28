export default function computedStyleToInlineStyle(
  element: HTMLElement,
  options?: {
    recursive?: boolean;
    properties?: string[];
  }
): void {
  if (!element) {
    throw new Error('No element specified.');
  }

  if (options?.recursive) {
    Array.prototype.forEach.call(element.children, (child) => {
      computedStyleToInlineStyle(child, options);
    });
  }

  const computedStyle = getComputedStyle(element);
  Array.prototype.forEach.call(
    options?.properties || computedStyle,
    (property) => {
      element.style[property] = computedStyle.getPropertyValue(property);
    }
  );
}
