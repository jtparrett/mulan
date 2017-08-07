#Mulan Js
Native es6 Component Library

```
class Item extends Component {
  render(el, props){
    return `
      <li>${props.index}</li>
    `
  }
}

class App extends Component {
  constructor(props){
    super(props)
  }

  render(el, props){
    return `
      <h1>${props.title}</h1>
      <ul>${el(Item, { index: 1 })}</ul>
    `
  }
}

new Root(document.getElementById('app'), App, {
  title: 'Mulan Test App'
})
```