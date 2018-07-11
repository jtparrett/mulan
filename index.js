'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var renderNode = exports.renderNode = function renderNode(el, template) {
  if (!el) {
    return false;
  }
  el.innerHTML = template(el).replace(/undefined|false/g, '');
  return el.childNodes;
};

var encode = exports.encode = function encode(data) {
  return encodeURIComponent(JSON.stringify(data));
};

var decode = exports.decode = function decode(data) {
  return JSON.parse(decodeURIComponent(data));
};

exports.default = { renderNode: renderNode, encode: encode, decode: decode };
