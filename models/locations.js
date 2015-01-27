var LocationSchema = new SimpleSchema({
  name: {
    type:String,
    minCount: 3
  },
  gps: {
    type: [Object],
    maxCount: 1
  },
  "gps.$.x_coordinate": {
    type: Number,
    decimal: true
  },
  "gps.$.y_coordinate": {
    type:Number,
    decimal: true
  },
  country:{
  	type:String
  },
  state: {
  	type:String
  },
  description : {
    type: String,
    optional: true
  }
});

Locations = new Mongo.Collection('Locations');
Locations.attachSchema(LocationSchema);



