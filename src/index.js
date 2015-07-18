import R from "ramda";
import _ from "lodash";

class CardHelpers {
  constructor(){
    this.partition = this._partition.bind(this);
  }

  _partition(schema, model, components, handlers){
    return R.map((field) => this._getSectionData(field, model, components, handlers), schema);
  }

 _getSectionData(field, model, components, handlers){
    const isNested = R.is(Object, field);
    const type = isNested ? R.keys(field)[0] : field;
    const data = isNested ? this._unnest(model, field, type) : model[field];
    const component = components && components[type];
    handlers = handlers && handlers[type];
    return { type, data, component, handlers };
  }

 _unnest(model, field, type){
   return R.map((title) => { return { type: title, data: model[title] } }, field[type]);
 }
}

export default CardHelpers;
