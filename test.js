import {assert} from 'chai';
import {
  check,
  getAllPropertyNames,
  computeStyle,
} from './src/internals';
import computedStyleToInlineStyle from './src';
import {computedStyles} from './src';
// setup
const styleAssignments = {
  one: {},
  two: {}
};
const handle = (index) => ({
  set: (obj, prop, value) => {
    styleAssignments[index][prop] = value;
    return true;
  }
});
const mockElement = {
  style: new Proxy({}, handle('one')),
  children: [
    {
      style: new Proxy({}, handle('two')),
      children: []
    }
  ]
};
/**
 * Mocks a CSSStyleDeclaration.
 * @extends Array
 */
class MockCSSStyleDeclaration extends Array {
  /**
   * Extends an array from Object.keys(anObject)
   * @param {Object} obj {[property]: styleValue} pairs.
   * @return {undefined}
   */
  constructor(obj) {
    super(...Object.keys(obj));
    Object.assign(this, obj);
  }
  /**
   * Looks up keys within this Array
   * @param  {String} name [description]
   * @return {*}      [description]
   */
  getPropertyValue(name) {
    return this[name];
  }
}
const styleObjects = [
  {'height': '12px', 'font-size': '1rem'},
  {'height': '12px', 'background-color': 'red'}
];
const mockCSSStyleDeclarations = styleObjects.map(
  (s) => new MockCSSStyleDeclaration(s)
);


const mockGetComputedStyle = new Map([
  [
    mockElement,
    mockCSSStyleDeclarations[0]
  ],
  [
    mockElement.children[0],
    mockCSSStyleDeclarations[1]
  ]
]);

global.window = {
  getComputedStyle(e){
    return mockGetComputedStyle.get(e);
  }
};

describe('internals', ()=>{
  describe('check', ()=>{
    it('passes mocked elements', ()=>{
      check(mockElement);
      check(mockElement.children[0]);
    });
  });
  describe('getAllPropertyNames', ()=>{
    it('correctly returns names', ()=>{
      assert.deepEqual(
        getAllPropertyNames(mockCSSStyleDeclarations[0]),
        ['height', 'font-size']
      );
    });
  });
  describe('computedStyle', ()=>{
    it('correctly parses a CSSStyleDeclaration', ()=>{
      assert.deepEqual(
        computeStyle(mockElement, ['height', 'font-size']),
        styleObjects[0]
      );
    });
  });
});
describe('exposed API', ()=>{
  describe('computedStyles', ()=>{
    it('correctly returns a Map of an element to an object of styles', ()=>{
      const expected = new Map([[mockElement, styleObjects[0]]]);
      const actual = computedStyles(mockElement);
      assert.equal(expected.size, actual.size);
      assert.deepEqual(expected.get(mockElement), actual.get(mockElement));
      assert(actual.has(mockElement));
    });
    it('reursively generates a correct element->style Map', ()=>{
      const expected = new Map([
        [mockElement, styleObjects[0]],
        [mockElement.children[0], styleObjects[1]]
      ]);
      const actual = computedStyles(mockElement, {recursive: true});
      assert.equal(expected.size, actual.size);
      assert(actual.has(mockElement));
      assert(actual.has(mockElement.children[0]));
      assert.deepEqual(
        expected.get(mockElement),
        actual.get(mockElement),
        'first element incorrectly generates styles'
      );
      assert.deepEqual(
        expected.get(mockElement.children[0]),
        actual.get(mockElement.children[0]),
        'second element incorrectly generates styles'
      );
    });
  });
  describe('computedStyleToInlineStyle', ()=>{
    it('Successfully inlines styles', ()=>{
      computedStyleToInlineStyle(mockElement, {recursive: true});
      assert.deepEqual(
        styleAssignments.one,
        styleObjects[0],
        'failed to inline styles on the first element'
      );
      assert.deepEqual(
        styleAssignments.two,
        styleObjects[1],
        'failed to inline styles on the nested element'
      );
    });
  });
});
