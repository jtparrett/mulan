# Mulan Js
ES6 Template Literal component library.

### Installation
```npm install mulan --save```
```yarn add mulan```

### API
```createRenderer(DOM Node, Function)```
Takes a DOM Node and a function, which is supplied a render function.
Returns the root and the render function.

#### Example:
```
import {createRenderer} from 'mulan'
import delegate from 'delegate-events'

const Results = (render, root) => {
  delegate.bind(root, '[data-item]', 'click', (e) => {
    console.log(e.target.dataset.item)
  })

  render(`
    <ul>
      <li data-item="1">1</li>
      <li data-item="2">2</li>
      <li data-item="3">3</li>
    </ul>
  `)
}

const Things = () => (`
  <p>This is some things</p>
`)

const App = ({title}) => (render, root) => {
  delegate.bind(root, '#button', 'click', () => {
    createRenderer(document.getElementById('result'), Results)
  })

  render(`
    <div>
      <h1>${title}</h1>
      <button id="button">Click Me!</button>
      <div id="result"></div>

      ${Things()}
    </div>
  `)
}

createRenderer(document.getElementById('app'), App({ title: 'This is Mulan' }))
```

![Mulan](mulan.jpg)