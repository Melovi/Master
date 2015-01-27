VideoSchema = new SimpleSchema({
    title: {
      type: String,
      min: 5,
      max: 30
    },
    subtitle: {
      type:String,
      optional:true,
      max: 20
    },
    interpret: {
      type: String,     
      denyUpdate:true 
    },
    user:{
      type: String,
      autoValue:function(){
        if(this.isInsert){
          return Meteor.userId();
        }
      },
      denyUpdate:true
    },
    location: {
      type: String
    },
    genre:{
      type:[String],
      optional:true,
      maxCount: 3
    },
    description: {
      type:String,
      optional: true
    },
    tags:{
      type:[String],
      optional: true,
      maxCount:5
    },
    source: {
      type: String,
      regEx: SimpleSchema.RegEx.Url
    },
    bpm: {
      type: Number,
      max: 300,
      min: 10
    },
    clips: {
      type: [String],
      optional:true
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
    views:{
      type: Number,
      autoValue:function(){
        if(this.isInsert){
          return 0;
        }
      }
    },
    createdAt: {
      type: Date,
      autoValue: function(){
        if(this.isInsert){
          return new Date;
        } else if (this.isUpsert){
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

VideoSchema.labels({
  interpret:"Interpret",
  tite:"Title",
  subtitle: "Subtitle",
  location: "Location",
  description: "Description",
  tags: "tags",
  source: "Song Source",
  createdAt: "Created At"

})


videos = new Mongo.Collection('videos');
videos.attachSchema(VideoSchema);




