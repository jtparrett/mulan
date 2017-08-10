# Mulan Js
Native es6 Component Library

### Npm Installation
```npm install mulan --save```

### Root API
```new Root(DOM Node, component, object)```
To be used when rendering a component to a DOM Node. Takes a DOM Node, the component to render and a props object.

### Component API
```this.setState(func, func)```
Takes a function that must return an object, and a callback; which is called before the root component re-renders.

```this.callMethod(string, object)```
Takes the method name and a props object. This is used when an event needs to be added to a DOM node.

```render(func, object, children)```
Component method which must return a HTML string. Provides a function to create sub-components and a props object.


#### Example:
```
import {Root,Component} from 'mulan'

class Item extends Component {
  constructor(props){
    super(props)
    this.state = {
      isSet: false
    }
  }

  onClick(target, props){
    this.setState(state => {
      return {
        isSet: props.isSet
      }
    })
  }

  render(el, props, children){
    return `
      <li onClick=${this.callMethod('onClick', { 
        isSet: true 
      })}>${props.copy} ${children && children()}</li>
    `
  }
}

class App extends Component {
  render(el, props, children){
    return `
      <h1>${props.title}</h1>
      <ul>${el(Item, { copy: 'Testing Props.' }, () => `
        <a href="#">Child Component</a>
      `)}</ul>
    `
  }
}

new Root(document.getElementById('app'), App, {
  title: 'Mulan Test App'
})
```

![Mulan](mulan.jpg)