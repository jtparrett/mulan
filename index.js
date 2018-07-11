(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

},{}]},{},[1]);
