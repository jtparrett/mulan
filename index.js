'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

document.Mulan = document.Mulan || {
  _rootRegister: [],
  _event: function _event(root, component, method, event, target) {
    return this._rootRegister[root]._componentRegister[component][method](target, this._rootRegister[root]._componentRegister[component]._eventRegister[event]);
  }
};

var Root = exports.Root = function Root(element, component, props) {
  _classCallCheck(this, Root);

  var _id = this._id = document.Mulan._rootRegister.length;
  var _root = document.Mulan._rootRegister[_id] = this;
  var _componentRegister = this._componentRegister = [];
  function _registerComponent(component, _id) {
    if (_componentRegister[_id] && _componentRegister[_id].constructor !== component.constructor) {
      return _registerComponent(component, _id + 0.01);
    }
    return _componentRegister[_id] = _componentRegister[_id] || component._setId(_id);
  }
  this.render = function () {
    var _nextId = 0;
    function el(component, props) {
      var comp = new component(Object.assign({ _root: _root }, props));
      return _registerComponent(comp, _nextId++)._reset().render(el, props);
    }
    element.innerHTML = el(component, props);
  };
  _root.render();
};

var Component = exports.Component = function Component(props) {
  _classCallCheck(this, Component);

  this.state = {};
  var _component = this;
  var _eventRegister = this._eventRegister = [];
  var _id = void 0,
      _nextEventId = void 0;
  this._setId = function (id) {
    _id = id;
    return _component;
  };
  this._reset = function () {
    _nextEventId = 0;
    return _component;
  };
  this.callMethod = function (method, methodProps) {
    var _eventId = _nextEventId++;
    _eventRegister[_eventId] = _eventRegister[_eventId] || methodProps;
    return 'document.Mulan._event(' + [props._root._id, _id, '"' + method + '"', _eventId, 'this'] + ')';
  };
  this.setState = function (thunk) {
    var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

    _component.state = Object.assign({}, _component.state, thunk(_component.state));
    callback(_component.state);
    props._root.render();
  };
};

exports.default = {
  Root: Root, Component: Component
};
