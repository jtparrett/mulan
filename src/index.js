window._rootRegister = []

class Root {
  constructor(element, component, props) {
    const _id = _rootRegister.length
    _rootRegister[_id] = this
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

class Component {
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
    return `window._rootRegister[${this.props._root._id}]._componentRegister[${this.props._id}]['${method}'](${['this', `window._rootRegister[${this.props._root._id}]._componentRegister[${this.props._id}]._eventRegister[${_id}]`]})`
  }
}

export default {
  Root,
  Component
}