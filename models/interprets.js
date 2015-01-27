InterpretsSchema = new SimpleSchema({
	name:{
		type:String,
        index: true,
        unique: true
	},
    user:{
        type:String,
        autoValue:function(){
            if(this.isInsert){
                return Meteor.userId();
            }
        },
        denyUpdate:true
    },
	image:{
		type:String,
		optional:true
	},
	bio:{
		type:String,
		optional:true
	},
	videos:{
		type:[String],
		optional:true,
        denyInsert: true
	},
    follower:{
        type:[String],
        optional:true,
        denyInsert:true
    },
    location:{
        type:String,
        denyUpdate:true
    },
    genre:{
      type:String,
      optional:true
    },
    lovs: {
        type: Object,
        optional:true    
    },
    "lovs.users":{
        type:[String],
        optional: true,
        autoValue:function(){
            if(this.isInsert){
                return [];
            }
        }
    },
    "lovs.count":{
        type:Number,
        min:0,
        autoValue:function(){
          if(this.isInsert){

            return 0;
          }
        }
    },
    createdAt: {
        type: Date,
        autoValue: function() {
            if (this.isInsert) {
              return new Date;
            } else if (this.isUpsert) {
              return {$setOnInsert: new Date};
            } else {
              this.unset();
            }
        }
    },
    lastUpdated: {
        type:Date,
        autoValue: function() {
            if (this.isUpdate) {
                return new Date();
            }
        },
        denyInsert: true,
        optional: true
    }
});

Interprets = new Meteor.Collection("Interprets");
Interprets.attachSchema(InterpretsSchema);