function addEvent(eventId){

  if(Meteor.userId() && eventId){

    var collection = "profile.events";

    if(!Meteor.users.findOne({_id: Meteor.userId(), "profile.events": eventId})){

      console.log("event found");

      var query = {};
      query[collection] = eventId;

      console.log(query);

      Meteor.users.update({_id: Meteor.userId()}, {$push: query},function(err){

        if(err){
          console.log(err);
        } else {

          UserEvents.update({_id: eventId}, {$push: {participants: Meteor.userId()}}, function(err){
            if(err){
              //console.log(err);
            } else {
              console.log("zum Event hinzugefügt");
            }
          });
          console.log("Event Added to profile");          
        }
      });

    } else {

      removeEvent(eventId);
    }

  } else {
    console.log("Alle notwendigen Felder eingeben");
  }
}

function removeEvent(eventId){

  if(Meteor.userId() && eventId){

    console.log("removeing event");

    Meteor.users.update({_id: Meteor.userId()}, {$pull: {"profile.events": eventId}}, function(err){

      if(err){
        console.log(err);
      } else {

        UserEvents.update({_id: eventId}, {$pull: {participants: Meteor.userId()}}, function(err){
          if(err){
            //console.log(err);
          } else {
            console.log("aus event entfernt");
          }
        });
        console.log("removed");
      }
    });
  }
}

function addLov(favorite, lovId){  	

  if(Meteor.userId() && lovOptionsMap[favorite]){
 
 	  var collection = "profile.lovs.";
    collection += lovOptionsMap[favorite];
   
    var query = {};
    query._id = Meteor.userId();
    query[collection] = lovId;

    console.log(query);
    
    var exists = Meteor.users.findOne(query);    

    if(!exists){

    	console.log("it does not exist");    	

    	newQuery = {};
    	newQuery[collection] = lovId;

    	//console.log(newQuery);

      Meteor.users.update( {_id: Meteor.userId() }, { $push: newQuery}, function(err){
        console.log("doin smth");

        if(err){
          //console.log(err);
        } else {
          console.log("added");
        }
      })
         
      
    } else {

      removeLov("id", lovId, collection);
    }

    Meteor.call("updateLikes", favorite, lovId);  

  } else {

    alert("Not logged in or Collection incorrect");
  }
}

function removeLov(selector, fav, collection){

  if(collection && fav && selector){
    
    var query = {};
    var select = {};    
    query[collection] = fav;

    console.log(query);

    Meteor.users.update({_id: Meteor.userId()},{$pull: query},function(err){
        if(err){
          console.log(err);
        } else {
          console.log("removed");
        }
      });

  } else {

    console.log("The Input type must contain one of ");
  } 

}


function addFavorite(favorite, query){  

  if(Meteor.userId() && lovOptionsMap[favorite]){
 
    var collection = "profile.favorites.";
    collection += lovOptionsMap[favorite];

    var checkQuery = {};
    checkQuery._id = Meteor.userId();
    checkQuery[collection + ".id"] = query.id;

    var exists = Meteor.users.findOne(checkQuery);    

    console.log("before");
    console.log(query);

    if(!exists){ 

      console.log("it does not exist");

      var newCollection = "profile.favorites.$." + lovOptionsMap[favorite];

      var newQuery = {}; 

      newQuery[collection] = query;
      

      console.log(newQuery);

      Meteor.users.update( {_id: Meteor.userId() }, {$push: newQuery}, function(err){

        if(err){
          console.log(err);
        } else {
          console.log("added");
        }
      })
         
      
    } else {

      removeFavorite("id", query.id, collection);
    }


  } else {

    alert("Not logged in or Collection incorrect");
  }
}


function removeFavorite(selector, fav, collection){

  if(collection && fav && selector){
    
    var query = {};
    var select = {};
    select[selector] = fav;
    query[collection] = select;

    console.log(query);

    Meteor.users.update({_id: Meteor.userId()},{$pull: query},function(err){
        if(err){
          console.log(err);
        } else {
          console.log("removed");
        }
      });

  } else {

    console.log("The Input type must contain one of ");
  } 

}

function addPlaylist(query){

  if(Meteor.userId() && query){

    Playlists.insert(query, function(err, doc){

      if(err){
        console.log(err);
      } else {

        console.log("inserting");
      }

      Meteor.users.update({_id: Meteor.userId()}, {$push: {"profile.playlists": doc}});
      Session.set("currentPlaylistId", doc);

    })


  } else{
    console.log("es ist etwas schief gelaufen. Nicht eingeloggt?");
  }
}