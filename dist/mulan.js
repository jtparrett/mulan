'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

window._rootRegister = [];

var Root = exports.Root = function () {
  function Root(element, component, props) {
    _classCallCheck(this, Root);

    var _id = _rootRegister.length;
    _rootRegister[_id] = this;
    this._id = _id;
    this.element = element;
    this.component = component;
    this.props = props;
    this._componentRegister = [];
    this.render();
  }

  _createClass(Root, [{
    key: 'render',
    value: function render() {
      var _root = this;
      var nextId = 0;
      function el(component, props) {
        var _id = nextId++;
        var comp = _root._componentRegister[_id] = _root._componentRegister[_id] || new component(Object.assign({ _id: _id, _root: _root }, props));
        return comp.render(el, props);
      }
      this._componentRegister.forEach(function (comp) {
        return comp._reset();
      });
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
    this._reset();
    this.callMethod.bind(this);
  }

  _createClass(Component, [{
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
      return 'window._rootRegister[' + this.props._root._id + ']._componentRegister[' + this.props._id + '][\'' + method + '\'](' + ['this', 'window._rootRegister[' + this.props._root._id + ']._componentRegister[' + this.props._id + ']._eventRegister[' + _id + ']'] + ')';
    }
  }]);

  return Component;
}();
