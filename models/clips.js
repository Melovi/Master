ClipSchema = new SimpleSchema({
  title: {
    type: String,
    optional:true
  },
  clipRef:{
    type: String
  },
  url: {
    type: String,
    optional:true,
    regEx: SimpleSchema.RegEx.Url
  },
  duration:{
    type: Number,
    decimal: true
  },
  startPosition:{
    type: Number,
    decimal: true
  },
  endPosition:{
    type: Number,
    decimal:true
  },
  trimStart:{
    type:Number,
    optional:true,
    decimal:true
  },
  trimEnd:{
    type:Number,
    optional:true,
    decimal:true
  },
  user:{
      type: String
  },
  videoId:{
    type:String
  },
  lovs: {
    type: Object,
    optional:true    
  },
  "lovs.users":{
    type:[String],
    optional: true
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
  location:{
    type:Object,
    optional:true
  },
  "location.city":{
    type: String
  },
  "location.geo":{
    type: [Number],
    maxCount: 2,
    decimal: true
  },
  flagged: {
    type: Number,
    autoValue:function(){
      if(this.isInsert){
        return 0;
      } else if(this.isUpsert){
        return {$setOnInsert: 0}
      } else {
        this.unset();
      }
    }
  },
  tags: {
    type: [String],
    optional: true
  },
  createdAt: {
    type: Date,
    autoValue:function(){
      if(this.isInsert){
        return new Date;
      } else if (this.isUpsert){
          return {$setOnInsert: new Date}
      } else {
        this.unset();
      }
    }
  }
});

var myUploadDir = "~/Dokumente/Git/dev/popcorn_player";

Clips = new Mongo.Collection('Clips');
Clips.attachSchema(ClipSchema);

VideoClips = new FS.Collection("VideoClips", {
  stores: [
    new FS.Store.FileSystem("UserClips", {path: "./uploads/clips", chunkSize: 115720000})

  ],
  filter:{
    maxSize: 115728640
  }
});