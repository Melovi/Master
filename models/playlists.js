var PlaylistSchema = new SimpleSchema({
	title:{
		type:String,
    optional:true
	},
	user:{
		type: String,
    autoValue:function(){
      if(this.isInsert){
        return Meteor.userId();
      }
    }
	},
	description:{
		type:String,
		optional:true
	},
	videos:{
		type:[String],
		optional:true
	},
  tags:{
      type:[String],
      optional:true,
      autoValue:function(){
        if(this.isInsert){
            return [];
        }
      }
  },
  lovs: {
    type: Object,
    optional:true    
  },
  "lovs.count":{
    type:Number,
    min: 0,
    autoValue:function(){
      if(this.isInsert){
        return 0;
      }
    }
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
  subscribers:{
  	type:[String],
  	optional:true,
        autoValue:function(){
          if(this.isInsert){
              return [];
            }
          }
  	},
    location:{
        type:String
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
        optional:true
    }
});

Playlists = new Meteor.Collection("Playlists");
Playlists.attachSchema(PlaylistSchema);
