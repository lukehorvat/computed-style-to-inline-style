import {assert} from 'chai';
import computedStyleToInlineStyle from './src';
import {computedStyles} from './src';
// setup
const mockElement = {
  styles: {},
  children: [
    {
      styles: {},
      children: []
    }
  ]
}
class mockCSSStyleDeclaration extends Array {
  constructor(obj) {
    super(Object.keys(obj));
    Object.assign(this, obj);
  }
  getPropertyValue(name) {
    return this[name];
  }
}

const mockCSSStyleDeclarations = [
  new mockCSSStyleDeclaration(
    {'height': '12px', 'font-size': '1rem'}
  ),
  new mockCSSStyleDeclaration(
    {'height': '12px', 'background-color': 'red'}
  )
];

const mockGetComputedStyle = new Map([
  [
    mockElement,
    mockCSSStyleDeclarations[0]
  ],
  [
    mockElement.children[0],
    mockCSSStyleDeclarations[1]
  ]
])

global.window = {
  getComputedStyle(e){
    return mockGetComputedStyle.get(e);
  }
}

describe('style computation', ()=>{
  it('works for a single element', ()=>{
    computedStyles(mockElement);
  })
})
