# Mulan Js
Native es6 Component Library

### Installation
```npm install mulan --save```

### Root API
```renderNode(DOM Node, Function)```
To be used when rendering a template literal to a DOM Node.
Takes a DOM Node and a function which must return a template literal string.
Returns the root nodes children.

```encode(Object)```
To be used when storing data against a Dom Node.
Takes an Object to be encoded.
Returns the encoded Object.

```decode(encoded data)```
To be used when decoding previously encoded object.
Takes encoded object.
Returns the decoded Object.

#### Example:
```
import {renderNode, encode, decode} from 'mulan'
import delegate from 'delegate-events'

const Results = (root) => {
  delegate.bind(root, '[data-item]', 'click', (e) => {
    const {itemId} = decode(e.target.dataset.item)
    console.log(itemId)
  })

  return `
    <ul>
      <li data-item="${encode({ itemId: 1 })}">1</li>
      <li data-item="${encode({ itemId: 2 })}">2</li>
      <li data-item="${encode({ itemId: 3 })}">3</li>
    </ul>
  `
}

const Things = (root) => (`
  <p>This is some things</p>
`)

const App = ({title}) => (root) => {
  
  delegate.bind(root, '#button', 'click', () => {
    renderNode(document.getElementById('result'), Results)
  })

  return `
    <div>
      <h1>${title}</h1>
      <button id="button">Click Me!</button>
      <div id="result"></div>

      ${Things(root)}
    </div>
  `
}

renderNode(document.getElementById('app'), App({ title: 'So this is Mulan' }))
```

![Mulan](mulan.jpg)