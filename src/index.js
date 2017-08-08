document.Mulan = document.Mulan || {
  _rootRegister: [],
  _event: function(root, component, method, event, target){
    return this._rootRegister[root]._componentRegister[component][method](target, this._rootRegister[root]._componentRegister[component]._eventRegister[event])
  }
}

export class Root {
  constructor(element, component, props) {
    const _id = document.Mulan._rootRegister.length
    document.Mulan._rootRegister[_id] = this
    this._id = _id
    this.element = element
    this.component = component
    this.props = props
    this._componentRegister = []
    this.render()
  }
  render(){
    const _root = this
    let nextId = 0
    function el(component, props){
      const _id = nextId++
      const comp = _root._componentRegister[_id] = (_root._componentRegister[_id] || new component(Object.assign({_id,_root}, props)))
      return comp.render(el, props)
    }
    this._componentRegister.forEach(comp => comp._reset())
    this.element.innerHTML = el(this.component, this.props)
  }
}

export class Component {
  constructor(props) {
    this.state = {}
    this.props = props
    this._eventRegister = []
    this._reset()
    this.callMethod.bind(this)
  }
  _reset(){
    this._nextEventId = 0
  }
  setState(thunk){
    this.state = Object.assign({}, this.state, thunk(this.state))
    this.props._root.render()
  }
  callMethod(method, props){
    const _id = this._nextEventId++
    this._eventRegister[_id] = this._eventRegister[_id] || props
    return `document.Mulan._event(${[this.props._root._id, this.props._id, `"${method}"`, _id, 'this']})`
  }
}

export default { 
  Root, Component 
}