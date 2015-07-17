import R from "ramda";
import _ from "lodash";

class CardHelpers {
  constructor(){
    this.partition = this._partition.bind(this);
  }

  _partition(schema, model, components){
    return R.map((field) => this.getSectionData(field, model, components), schema);
  }

 unnest(model, field, type){
   return R.map((title) => {
     const value = model[title];
     return { title, value }
   }, field[type]);
 }

  getSectionData(field, model, components){
    const isNested = R.is(Object, field);
    const type = isNested ? R.keys(field)[0] : field;
    const data = isNested ? this.unnest(model, field, type) : model[field];
    const component = components && components[type];
    return component ? { type, data, component } : { type, data }
  }

  _getFields(sectionType, model, fields){
    return R.map((fieldName) => {
      return [fieldName, model[fieldName]];
    }, fields);
  }
}
export default CardHelpers;
