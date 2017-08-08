# Mulan Js
Native es6 Component Library

`npm install mulan --save`
`https://cdn.jsdelivr.net/npm/mulan/index.js`

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

  render(el, props){
    return `
      <li onClick=${this.callMethod('onClick', { 
        isSet: true 
      })}>${props.copy}</li>
    `
  }
}

class App extends Component {
  render(el, props){
    return `
      <h1>${props.title}</h1>
      <ul>${el(Item, { copy: 'Testing Props.' })}</ul>
    `
  }
}

new Root(document.getElementById('app'), App, {
  title: 'Mulan Test App'
})
```

![Mulan](mulan.jpg)