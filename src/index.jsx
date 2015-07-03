import R from "ramda";
import _ from "lodash";

class CardHelpers {
  constructor(){
    this.partition = this._partition.bind(this);
  }

  _partition(schema, model, context){
    const contextSchema = this._getSchema(schema, context);
    const partitions = R.map((schemaField) => {
      const { sectionTitle, fields } = this.getSectionData(schemaField, model);
      return {sectionTitle, fields};
    }, contextSchema);
    return partitions;
  }

  _getSchema(schema, context){
    return context ? schema[context] : schema;
  }

  getSectionData(schemaField, model){
    const isMany = _.isObject(schemaField);
    const sectionTitle = isMany ? R.keys(schemaField)[0] : schemaField;
    const sectionFields = isMany && schemaField[sectionTitle];
    const fields = isMany ? this._getFields(sectionTitle, model, sectionFields) : [model[sectionTitle]];
    return { sectionTitle, fields };
  }

  _getFields(sectionTitle, model, fields){
    return R.map((fieldName) => {
      return [fieldName, model[fieldName]];
    }, fields);
  }
}
export default CardHelpers;
