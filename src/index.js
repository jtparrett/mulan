document.Mulan = document.Mulan || {
  _rootRegister: [],
  _event: function(root, component, method, event, target){
    return this._rootRegister[root]._componentRegister[component][method](target, this._rootRegister[root]._componentRegister[component]._eventRegister[event])
  }
}

export class Root {
  constructor(element, component, props) {
    const _id = this._id = document.Mulan._rootRegister.length
    const _root = document.Mulan._rootRegister[_id] = this
    const _componentRegister = this._componentRegister = []
    function _registerComponent(component, _id){
      if(_componentRegister[_id] && _componentRegister[_id].constructor !== component.constructor){
        return _registerComponent(component, _id+0.01)
      }
      return _componentRegister[_id] = (_componentRegister[_id] || component._setId(_id))
    }
    this.render = function(){
      let _nextId = 0
      function el(component, props, children){
        const _props = Object.assign({}, props, {_root,children})
        const comp = new component(_props)
        return _registerComponent(comp, _nextId++)._reset(_props).render(el, _props, children)
      }
      element.innerHTML = el(component, props)
    }
    _root.render()
  }
}

export class Component {
  constructor(props) {
    this.state = {}
    this.props = props
    const _component = this
    const _eventRegister = this._eventRegister = []
    let _id, _nextEventId
    this._setId = function(id){
      _id = id
      return _component
    }
    this._reset = function(_props){
      _nextEventId = 0
      _component.props = _props
      return _component
    }
    this.callMethod = function(method, methodProps){
      const _eventId = _nextEventId++
      _eventRegister[_eventId] = _eventRegister[_eventId] || methodProps
      return `'return document.Mulan._event(${[props._root._id, _id, `"${method}"`, _eventId, 'this']})'`
    }
    this.setState = function(thunk, callback = () => {}){
      _component.state = Object.assign({}, _component.state, thunk(_component.state))
      callback(_component.state)
      props._root.render()
    }
  }
}

export default { 
  Root, Component 
}