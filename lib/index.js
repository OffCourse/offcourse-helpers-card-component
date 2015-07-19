"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _ramda = require("ramda");

var _ramda2 = _interopRequireDefault(_ramda);

var CardHelpers = (function () {
  function CardHelpers() {
    _classCallCheck(this, CardHelpers);

    this.partition = this._partition.bind(this);
  }

  _createClass(CardHelpers, [{
    key: "_partition",
    value: function _partition(schema, model, components, handlers) {
      var _this = this;

      return _ramda2["default"].map(function (field) {
        return _this._getSectionData(field, model, components, handlers);
      }, schema);
    }
  }, {
    key: "_getSectionData",
    value: function _getSectionData(field, model, components, handlers) {
      var isNested = _ramda2["default"].is(Object, field);
      var type = isNested ? _ramda2["default"].keys(field)[0] : field;
      var data = isNested ? this._unnest(model, field, type) : model[field];
      var component = components && components[type];
      handlers = handlers && handlers[type];
      return { type: type, data: data, component: component, handlers: handlers };
    }
  }, {
    key: "_unnest",
    value: function _unnest(model, field, type) {
      return _ramda2["default"].map(function (title) {
        return { type: title, data: model[title] };
      }, field[type]);
    }
  }]);

  return CardHelpers;
})();

exports["default"] = CardHelpers;
module.exports = exports["default"];