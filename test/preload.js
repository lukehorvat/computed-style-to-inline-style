const { contextBridge } = require('electron');
const computedStyleToInlineStyle = require('..').default;

contextBridge.exposeInMainWorld(
  'computedStyleToInlineStyle',
  computedStyleToInlineStyle
);
