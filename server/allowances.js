function updateLovs(fields, modifier){

  if(fields[0] == "users" || fields[0] == "count"){

    var inc = modifier.$inc["count"];
    var user = modifier.$push["users"] || modifier.$pull["users"];

    if(inc > 1){

      modifier.$inc["lovs"] = 1;

    } else if(inc < -1){

      modifier.$inc["lovs"] = -1;
    }

    if(user != Meteor.userId()){

      if(modifier.$push){

        modifier.$push["users"] = Meteor.userId();

      } else if(modifier.$pull){

        modifier.$pull["users"] = Meteor.userId();
      }      

    } 

    return true;

  } else {

    console.log("trying to update invalid field");

    return false;
  }

}


if (Meteor.isServer) {

  //Videos 
  videos.allow({
    insert : function (userId, vid) {

      if(userId){
        console.log("creating video " + vid.id);
        return true;
      } else {
        console.log("not logged in");
          return false;
        }
    },
    update : function (userId, doc, fields, modifier) {

      /*console.log("============================================0");
      console.log(userId);
      console.log("--------------------------------------------------");
      console.log("Document:");
      console.log(doc);
      console.log("--------------------------");
      console.log("Fields");
      console.log(fields);
      console.log("--------------------------");
      console.log("Modifier: ");
      console.log(modifier);

      console.log("==============================================");
      */
      if(userId === doc.user){

        console.log("owner modifing");

        return true;

      } else if(_.contains(fields, "clips") || _.contains(fields, "views")){

          console.log("another user modifing");
         

          if(fields[0] == "views"){

            console.log("incrementing views");

            var inc = modifier.$inc["views"];

            console.log(inc);

            if(inc > 1){

              console.log("stop trying to cheat");

              modifier.$inc["views"] = 1;

              console.log(modifier);

              return true;

            } else {

              return true;
            }

          } else if(fields[0] == "clips"){

              console.log("adding a clip");

              return userId;

          }          
      } else {

        return false;
      }
    },
    remove : function () {
      return true;
    }
  });

  //Clips
  Clips.allow({
    insert : function () {
      return true;
    },
    update : function (userId, doc, fields, modifier) {

      if(userId == doc.user){

        return true;

      } else {

        return false;
      }
      
    },
    remove : function (userId, doc) {
     if(userId == doc.user){

        return true;

      } else {
        return false;
      }
    }
  });

  VideoClips.allow({
    insert:function(userId){

      

      return userId;
    },
    update: function(){

     
      return true;
    },
    remove:function(){

      

      return true;
    },
    download:function(){

      

      return true;
    }

  })

  //Locations 
  Locations.allow({
    insert : function (userId) {
      return userId;
    },
    update : function (userId) {
      return userId;
    },
    remove : function (userId) {
      return userId;
    }
  });

  //Users
  /*Meteor.users.deny({
    update : function (userId, doc, fields, modifier) {

      /*console.log("----------------------------------------------");
      console.log(userId);
      console.log(doc);
      console.log(fields);
      console.log(modifier);

      

      return false;
    }
  });*/

  Meteor.users.allow({
    insert:function(){

      return true;
    },
    update: function(userId, doc){

      

      return userId == doc._id;
    },
    remove: function(){
      return true;
    }
  })

  Genres.allow({
    insert : function () {
      return true;
    },
    update : function () {
      return true;
    },
    remove : function () {
      return true;
    }
  });

  Interprets.allow({
    insert:function(userId, doc){

      if(userId){
        console.log(doc);
        return true;
      } else {
        console.log("not logged in");
          return false;
        }
    },
    update:function(userId, doc, fields, modifier){

      
      if(fields[0] == "lovs"){

        return userId;
      } else {

        return userId === doc._id
      }      
    },
    remove:function(userId, doc){

      return doc._id === userId;
    }
  })

  UserEvents.allow({
    insert:function(){

      console.log("adding event");
      return true;
    },
    update: function(userId, doc, fields, modifier){

      
      if(fields[0] == "participants"){

        return userId;
      } else {

        return doc._id === userId;
      }      
    },
    remove: function(){
      return true;
    }
  });

  UserImages.allow({
    insert:function(userId, docs){

     
      return true;
    },
    update:function(userId, docs, fields, modifier){

     
      return true;
    },
    remove:function(userId){
      return true;
    },
    download:function(userId){
      return true;
    }
  });

  Playlists.allow({
    insert:function(userId, doc){

     

      return userId;
    },
    update:function(userId, doc, fields, modifier){

   

      console.log("doing smth");
      console.log(fields);

      if(userId){

        if(userId === doc.user){

          return true;

        } else {

          updateLovs(fields, modifier);

        }

      } else {

        console.log("not logged in");
        return false;
      } 

    },
    remove:function(userId, doc){

      return userId === doc.user;
    }
  })

}