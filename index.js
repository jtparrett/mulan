'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

document.Mulan = document.Mulan || {
  _rootRegister: [],
  _event: function _event(root, component, method, event, target) {
    return this._rootRegister[root]._componentRegister[component][method](target, this._rootRegister[root]._componentRegister[component]._eventRegister[event]);
  }
};

var Root = exports.Root = function () {
  function Root(element, component, props) {
    _classCallCheck(this, Root);

    var _id = document.Mulan._rootRegister.length;
    document.Mulan._rootRegister[_id] = this;
    this._id = _id;
    this.element = element;
    this.component = component;
    this.props = props;
    this._componentRegister = [];
    this._registerComponent.bind(this);
    this.render();
  }

  _createClass(Root, [{
    key: '_registerComponent',
    value: function _registerComponent(component, _id) {
      if (this._componentRegister[_id]) {
        if (this._componentRegister[_id].constructor === component.constructor) {
          return this._componentRegister[_id];
        } else {
          return this._registerComponent(component, _id + 0.1);
        }
      } else {
        return this._componentRegister[_id] = component._setId(_id);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _root = this;
      var nextId = 0;
      function el(component, props) {
        var comp = _root._registerComponent(new component(Object.assign({ _root: _root }, props)), nextId++);
        comp._reset();
        return comp.render(el, props);
      }
      this.element.innerHTML = el(this.component, this.props);
    }
  }]);

  return Root;
}();

var Component = exports.Component = function () {
  function Component(props) {
    _classCallCheck(this, Component);

    this.state = {};
    this.props = props;
    this._eventRegister = [];
    this.callMethod.bind(this);
  }

  _createClass(Component, [{
    key: '_setId',
    value: function _setId(_id) {
      this._id = _id;
      return this;
    }
  }, {
    key: '_reset',
    value: function _reset() {
      this._nextEventId = 0;
    }
  }, {
    key: 'setState',
    value: function setState(thunk) {
      this.state = Object.assign({}, this.state, thunk(this.state));
      this.props._root.render();
    }
  }, {
    key: 'callMethod',
    value: function callMethod(method, props) {
      var _id = this._nextEventId++;
      this._eventRegister[_id] = this._eventRegister[_id] || props;
      return 'document.Mulan._event(' + [this.props._root._id, this._id, '"' + method + '"', _id, 'this'] + ')';
    }
  }]);

  return Component;
}();

exports.default = {
  Root: Root, Component: Component
};
