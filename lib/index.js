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
    value: function _partition(schema, model) {
      var _this = this;

      return _ramda2["default"].map(function (key) {
        return _this._getSectionData(key, schema, model);
      }, _ramda2["default"].keys(schema));
    }
  }, {
    key: "_getSectionData",
    value: function _getSectionData(key, schema, model) {
      var type = key;
      var _schema$key = schema[key];
      var component = _schema$key.component;
      var handlers = _schema$key.handlers;

      var fields = schema[key].fields;
      var data = this._getData(fields, key, model);
      return { type: type, data: data, component: component, handlers: handlers };
    }
  }, {
    key: "_getData",
    value: function _getData(fields, key, model) {

      if (fields === undefined) {
        return model[key];
      }

      if (_ramda2["default"].is(String, fields)) {
        return model[fields];
      }

      if (_ramda2["default"].is(Array, fields)) {
        return _ramda2["default"].map(function (type) {
          return { type: type, data: model[type] };
        }, fields);
      }

      if (_ramda2["default"].is(Object, fields)) {
        return _ramda2["default"].reduce(function (acc, field) {
          var keyName = fields[field] || field;
          acc[keyName] = model[field];
          return acc;
        }, {}, _ramda2["default"].keys(fields));
      }
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