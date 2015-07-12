import R from "ramda";
import _ from "lodash";

class CardHelpers {
  constructor(){
    this.partition = this._partition.bind(this);
  }

  _partition(schema, model){
    const partitions = R.map((field) => {
      const { type, fields } = this.getSectionData(field, model);
      return { type, fields };
    }, schema);
    return partitions;
  }

  _getSchema(schema, context){
    return context ? schema[context] : schema;
  }

  getSectionData(schemaField, model){
    const isMany = _.isObject(schemaField);
    const type = isMany ? R.keys(schemaField)[0] : schemaField;
    const sectionFields = isMany && schemaField[type];
    const fields = isMany ? this._getFields(type, model, sectionFields) : [[type, model[type]]];
    return { type, fields };
  }

  _getFields(sectionType, model, fields){
    return R.map((fieldName) => {
      return [fieldName, model[fieldName]];
    }, fields);
  }
}
export default CardHelpers;
