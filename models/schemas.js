var myUploadDir;

Schemas = {};

SimpleSchema.messages({
    required: "[label] muss eingetragen werden"
})

FavSchemas = {};

FavSchemas.Clips = new SimpleSchema({
    id:{
        type:String
    },
    title:{
        type:String
    },
    description:{
        type:String,
        optional:true
    },
    tags:{
        type:[String],
        optional:true
    },
    createdAt:{
        type: Date
    }
})


FavSchemas.UserEvents = new SimpleSchema({
    id:{
        type: String
    },
    name: {
        type: String
    },
    date:{
        type:Date
    }
});

FavSchemas.Bands = new SimpleSchema({
    id:{
        type: String
    },
    name: {
        type: String
    }
});

FavSchemas.Vids = new SimpleSchema({
    id:{
        type:String
    },
    title:{
        type:String
    },
    interpret:{
        type:String
    }
});

FavSchemas.Locs = new SimpleSchema({
    id:{
        type:String
    },
    name: {
        type: String
    },
    description: {
        type: String
    }
});

FavSchemas.Playlists = new SimpleSchema({
    id:{
        type:String
    },
    title: {
        type: String
    }
});


FavSchema = new SimpleSchema({    
    clips:{
        type:[FavSchemas.Clips],
        optional:true,
        autoValue:function(){
            if(this.isInsert){
                return [];
            }
        }
    },
    locations:{
        type: [FavSchemas.Locs],
        optional:true,
        autoValue:function(){
            if(this.isInsert){
                return [];
            }
        }
    },
    videos:{
        type: [FavSchemas.Vids],
        optional:true,
        autoValue:function(){
            if(this.isInsert){
                return [];
            }
        }
    },
    interprets:{
        type:[FavSchemas.Bands],
        optional:true,
        autoValue:function(){
            if(this.isInsert){
                return [];
            }
        }
    },
    userEvents:{
        type:[FavSchemas.UserEvents],
        optional:true,
        autoValue:function(){
            if(this.isInsert){
                return [];
            }
        }
    },
    playlists:{
        type:[FavSchemas.Playlists],
        optional:true,
        autoValue:function(){
            if(this.isInsert){
                return [];
            }
        }
    }

});

LovSchema = new SimpleSchema({
    clips:{
        type:[String], 
        optional:true
    },
    events:{
        type:[String], 
        optional:true
    },
    interprets:{
        type:[String], 
        optional:true
    },
    locations:{
        type:[String], 
        optional:true
    },
    videos:{
        type:[String], 
        optional:true
    },
    playlists:{
        type:[String],
        optional:true
    }
});


UserCountrySchema = new SimpleSchema({
    country: {
        type: String,
        label: "Land"
    },
    state: {
        type:String,
        label: "Bundesland"
    },
    city: {
        type:String,
        label: "Stadt",
        regEx: /^[a-zA-Z-\s]{2,25}$/
    }
});

UserTagsSchema = new SimpleSchema({
    music: {
        type: [String],
        label: "Music",
        autoValue:function(){
            if(this.isInsert){
                return [];
            }
        },
        optional:true
    },
    hobbies: {
        type: [String],
        label: "Hobbies",
        autoValue:function(){
            if(this.isInsert){
                return [];
            }
        },
        optional:true
    },
    talents: {
        type: [String],
        label: "Talents",
        autoValue:function(){
            if(this.isInsert){
                return [];
            }
        },
        optional:true
    }
})

UserProfileSchema = new SimpleSchema({
    firstName: {
        type: String,
        regEx: /^[a-zA-Z-]{2,25}$/,
        optional: true
    },
    lastName: {
        type: String,
        regEx: /^[a-zA-Z]{2,25}$/,
        optional: true
    },
    birthday: {
        type: Date,
        optional: true
    },
    gender: {
        type: String,
        allowedValues: ['Male', 'Female'],
        autoform: {
          options: [
            {label: "Male", value: "Male"},
            {label: "Female", value: "Female"}
          ]
        },
        optional: true
    },
    organization : {
        type: String,
        regEx: /^[a-z0-9A-z- .]{3,30}$/,
        optional: true
    },
    bio: {
        type: String,
        optional: true
    },
    tags: {
        type: UserTagsSchema,
        label: "Tags",
        optional:true
    },
    country: {
        type: UserCountrySchema,
        label:"Location",
        optional: true
    },
    location:{
        type: String,
        optional: true
    },
    avatar: {
        type: String,
        label: "Profile Picture",
        autoValue:function(){
            if(this.isInsert){
                return "http://spacelist.ca/assets/v2/placeholder-user.jpg";
            }
        },
        optional:true
    },
    rankScore: {
        type: Number,
        label: "Rank",
        autoValue:function(){
            if(this.isInsert){
                return 0;
            }
        }
    },
    events:{
        type:[String],
        optional:true,
        autoValue:function(){
          if(this.isInsert){
              return [];
          }
        }
    },
    bands:{
        type:[String],
        optional:true,
        autoValue:function(){
          if(this.isInsert){
              return [];
          }
        }       
    },
    playlists: {
        type: [String],
        optional:true,
        autoValue:function(){
          if(this.isInsert){
              return [];
          }
        }
    },
    clips:{
        type: [String],
        optional:true,
        autoValue:function(){
          if(this.isInsert){
              return [];
          }
        }
    },
    lovs:{
        type: LovSchema,
        optional:true
    },
    favorites:{
        type: FavSchema,
        optional:true
    }
});

UserSchema = new SimpleSchema({
    username: {
        type: String,
        regEx: /^[a-z0-9A-Z_\s]{3,15}$/,
        denyUpdate: true,
        optional:true
    },
    emails: {
        type: [Object],
        // this must be optional if you also use other login services like facebook,
        // but if you use only accounts-password, then it can be required
        optional: true
    },
    "emails.$.address": {
        type: String,
        regEx: SimpleSchema.RegEx.Email
    },
    "emails.$.verified": {
        type: Boolean
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
        },
        denyUpdate:true
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

    },
    profile: {
        type: UserProfileSchema,
        optional: true
    },
    services: {
        type: Object,
        optional: true,
        blackbox: true
    },
    // Add `roles` to your schema if you use the meteor-roles package.
    // Note that when using this package, you must also specify the
    // `Roles.GLOBAL_GROUP` group whenever you add a user to a role.
    // Roles.addUsersToRoles(userId, ["admin"], Roles.GLOBAL_GROUP);
    // You can't mix and match adding with and without a group since
    // you will fail validation in some cases.
    roles: {
        type: Object,
        optional: true,
        blackbox: true
    }
});

Meteor.users.attachSchema(UserSchema);


