import R from "ramda";
import _ from "lodash";

class CardHelpers {
  constructor(){
    this.partition = this._partition.bind(this);
  }

  _partition(schema, model){
    const partitions = R.map((field) => {
      const { title, fields } = this.getSectionData(field, model);
      return { title, fields };
    }, schema);
    return partitions;
  }

  _getSchema(schema, context){
    return context ? schema[context] : schema;
  }

  getSectionData(schemaField, model){
    const isMany = _.isObject(schemaField);
    const title = isMany ? R.keys(schemaField)[0] : schemaField;
    const sectionFields = isMany && schemaField[title];
    const fields = isMany ? this._getFields(title, model, sectionFields) : [[title, model[title]]];
    return { title, fields };
  }

  _getFields(sectionTitle, model, fields){
    return R.map((fieldName) => {
      return [fieldName, model[fieldName]];
    }, fields);
  }
}
export default CardHelpers;
