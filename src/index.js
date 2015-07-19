import R from "ramda";

class CardHelpers {
  constructor(){
    this.partition = this._partition.bind(this);
  }

  _partition(schema, model){
    return R.map((key) => this._getSectionData(key, schema, model), R.keys(schema));
  }

 _getSectionData(key, schema, model){
   const type = key;
   const { component, handlers } = schema[key];
   const fields = schema[key].fields;
   const data = this._getData(fields, key, model); 
   return { type, data, component, handlers };
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
       const key = fields[field] || field;
       acc[key] = model[field]
       return acc;
     }, {}, R.keys(fields));
   }
 }

  _unnest(model, field, type){
    return R.map((title) => { return { type: title, data: model[title] }; }, field[type]);
  }
}

export default CardHelpers;
