import R from "ramda";

class CardHelpers {
  constructor(){
    this.partition = this._partition.bind(this);
  }

  _partition(schema, model){
    return R.map(({ type, fields, component, handlers }) => {
      const data = this._getData(fields, type, model);
      return { type, data, component, handlers };
    }, schema);

 }

 _getData(fields, key, model){

   if(fields === undefined){
     return model[key];
   }

   if(R.is(String, fields)){
     return model[fields];
   }

   if(R.is(Array, fields)){
     return R.map((type) => {
       return { type, data: model[type] };
     }, fields);
   }

   if(R.is(Object, fields)){
     return R.reduce((acc, field)=> {
       const keyName = fields[field] || field;
       acc[keyName] = model[field];
       return acc;
     }, {}, R.keys(fields));
   }
 }

  _unnest(model, field, type){
    return R.map((title) => { return { type: title, data: model[title] }; }, field[type]);
  }
}

export default CardHelpers;
