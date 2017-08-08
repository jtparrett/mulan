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
    this._registerComponent.bind(this)
    this.render()
  }
  _registerComponent(component, _id){
    if(this._componentRegister[_id]){
      if(this._componentRegister[_id].constructor === component.constructor){
        return this._componentRegister[_id]
      } else {
        return this._registerComponent(component, _id + 0.1)
      }
    } else {
      return this._componentRegister[_id] = component._setId(_id)
    }
  }
  render(){
    const _root = this
    let nextId = 0
    function el(component, props){
      const comp = _root._registerComponent(new component(Object.assign({_root}, props)), nextId++)
      comp._reset()
      return comp.render(el, props)
    }
    this.element.innerHTML = el(this.component, this.props)
  }
}

export class Component {
  constructor(props) {
    this.state = {}
    this.props = props
    this._eventRegister = []
    this.callMethod.bind(this)
  }
  _setId(_id){
    this._id = _id
    return this
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
    return `document.Mulan._event(${[this.props._root._id, this._id, `"${method}"`, _id, 'this']})`
  }
}

export default { 
  Root, Component 
}