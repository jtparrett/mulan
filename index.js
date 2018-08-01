'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var createRenderer = exports.createRenderer = function createRenderer(el, component) {
  if (!el) {
    return false;
  }
  var root = el.cloneNode(false);
  var cache = void 0;
  var render = function render(template) {
    if (template !== cache) {
      root.innerHTML = template.replace(/undefined|false|NaN|null/g, '');
      cache = template;
    }
    return root;
  };
  component(render, root);
  el.parentNode.replaceChild(root, el);
  return { render: render, root: root };
};

exports.default = { createRenderer: createRenderer };
