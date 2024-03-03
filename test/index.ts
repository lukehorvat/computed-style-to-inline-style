import computedStyleToInlineStyle from '../lib';

const h1 = document.createElement('h1');
h1.style.color = '#aaa';
document.body.appendChild(h1);

const textStart = document.createTextNode('Hello, ');
h1.appendChild(textStart);

const span = document.createElement('span');
span.textContent = 'World';
h1.appendChild(span);

const textEnd = document.createTextNode('!');
h1.appendChild(textEnd);

const button = document.createElement('button');
button.type = 'button';
button.textContent = 'Test';
button.addEventListener('click', () => {
  computedStyleToInlineStyle(h1, {
    recursive: true,
    properties: ['font-size', 'text-decoration'],
  });
});
document.body.appendChild(button);
