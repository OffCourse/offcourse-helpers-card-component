"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _ramda = require("ramda");

var _ramda2 = _interopRequireDefault(_ramda);

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var CardHelpers = (function () {
  function CardHelpers() {
    _classCallCheck(this, CardHelpers);

    this.partition = this._partition.bind(this);
  }

  _createClass(CardHelpers, [{
    key: "_partition",
    value: function _partition(schema, model) {
      var _this = this;

      var partitions = _ramda2["default"].map(function (field) {
        var _getSectionData = _this.getSectionData(field, model);

        var title = _getSectionData.title;
        var data = _getSectionData.data;

        return { title: title, data: data };
      }, schema);
      return partitions;
    }
  }, {
    key: "_getSchema",
    value: function _getSchema(schema, context) {
      return context ? schema[context] : schema;
    }
  }, {
    key: "getSectionData",
    value: function getSectionData(schemaField, model) {
      var isMany = _lodash2["default"].isObject(schemaField);
      var sectionTitle = isMany ? _ramda2["default"].keys(schemaField)[0] : schemaField;
      var sectionFields = isMany && schemaField[sectionTitle];
      var fields = isMany ? this._getFields(sectionTitle, model, sectionFields) : [[sectionTitle, model[sectionTitle]]];
      return { sectionTitle: sectionTitle, fields: fields };
    }
  }, {
    key: "_getFields",
    value: function _getFields(sectionTitle, model, fields) {
      return _ramda2["default"].map(function (fieldName) {
        return [fieldName, model[fieldName]];
      }, fields);
    }
  }]);

  return CardHelpers;
})();

exports["default"] = CardHelpers;
module.exports = exports["default"];