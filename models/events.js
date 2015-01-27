var EventSchema = new SimpleSchema({
	name:{
		type:String
	},
	user:{
      type: String,
      autoValue:function(){
      	if(this.isInsert){
      		return Meteor.userId();
      	}
      }
    },
	participants:{
		type:[String],
		optional:true,
		autoValue:function(){
			if(this.isInsert){
				return [Meteor.userId()];
			}
		}
	},
	subtitle:{
		type:String,
		optional:true
	},
	description:{
		type:String,
		optional:true
	},
	date:{
		type:Date,
		min:function(){

			return new Date;
		}
	},
	address:{
		type:Object
	},
	"address.city":{
		type:String
	},
	"address.street":{
		type:String
	},
	"address.streetNumber":{
		type:Number,
		min:0
	},
	genre:{
		type:String,
		optional:true
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
        optional: true
    }
})

UserEvents = new Meteor.Collection("UserEvents");
UserEvents.attachSchema(EventSchema);
