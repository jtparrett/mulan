# Mulan Js
Native es6 Component Library

```
class Item extends Component {
  constructor(props){
    super(props)
    this.state = {
      isSet: false
    }
  }

  onClick(target, props){
    console.log(target, props)
    this.setState(state => {
      return {
        isSet: props.isSet
      }
    })
  }

  render(el, props){
    return `
      <li onClick=${this.callMethod('onClick', { isSet: true })}>${props.index}</li>
    `
  }
}

class App extends Component {
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