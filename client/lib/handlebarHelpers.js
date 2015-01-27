
UI.registerHelper('debug', function (optionalValue) {
  if (typeof console !== "undefined" || typeof console.log !== "undefined") {
    console.log("Current Context");
    console.log("====================");
    console.log(this);
    if (optionalValue) {
      console.log("Value");
      console.log("====================");
      console.log(optionalValue);
    }

    return '';
  }

  // For IE8
  alert(this);

  if (optionalValue) {
    alert(optionalValue);
  }

  return '';
});

UI.registerHelper('trimString', function(passedString, length){
 
  if(passedString && length){

    var lengthInt = parseInt(length);
    var newString = passedString.substring(0, length);
    newString += "...";

    return new Handlebars.SafeString(newString);

  }
  
});

UI.registerHelper('currentLocation', function(){

  if(Session.get("currentLocation")){

    return Session.get("currentLocation");
  }
});

UI.registerHelper("locationOptions", function(){

  if("locationOptions"){

    return Locations.find().map(function(c){
      return {label: c.name, value: c.name}; 
    });
  }
});

UI.registerHelper("genreOptions", function(){
  if("genreOptions"){

    var genres = Genres.find().fetch();   

    allOptions = setOptionFields(genres, "subgenres");    

    return allOptions;
  }
})

UI.registerHelper('markedIf', function(fav, id, color){

  if(fav && lovOptionsMap[fav] && color){

    var collection = "favorites." + lovOptionsMap[fav];

    var checkCollection = "profile." + collection + ".id";
    var query = {};
    query._id = Meteor.userId();
    query[checkCollection] = id;  

    //console.log(query);

    //console.log("from helper:");
    //console.log(Meteor.users.findOne(query));  

    return Meteor.users.findOne(query) ? color : "";

  } else {

    console.log("In HTML file ein fehler: Muss vom typ sein");
    return "";
  }
});

UI.registerHelper("lovedIf", function(fav, id, color){

  if(fav && lovOptionsMap[fav] && color){

    var collection = "profile.lovs." + lovOptionsMap[fav];
   
    var query = {};
    query._id = Meteor.userId();
    query[collection] = id;

    // console.log(query);

    // console.log("from helper:");
    // console.log(Meteor.users.findOne(query));

    return Meteor.users.findOne(query) ? color : "";

  } else {

    console.log("In HTML file ein fehler: Muss vom typ sein");
    return "";
  }


});

UI.registerHelper("particpateIf", function(id, negField, posField){

  if(Meteor.userId() && id && negField && posField){

    return Meteor.users.findOne({_id: Meteor.userId(), "profile.events": id}) ? negField : posField;

  } else {

    console.log("Etwas schief gelaufen, Felder checken!");
  }

});


UI.registerHelper("formatTime", function(context, options){
  if(context && options){

    var formatedDate;

    switch(options){

      case "detailed":
        //return moment(context).format("DD/MM/YYYY - HH:mm");
        break;

      case "simple":
        //return moment(context).format("DD/MM/YYYY");
        break;

      case "input":
        //return moment(context).format("YYYY-MM-DD");
        break;

    }   
  }
});

UI.registerHelper("quickInfo", function(context, id){

  if(id && context){


    //Hier wird ein error geschimssen da die Collections noch nicht ready sind
    //console.log(context + " of " + id);

    switch(context){

      case "playlist":
        //console.log("searching playlist");
        var plst = Playlists.findOne({_id: id}, {fields: {"avatar": 1, "title": 1, "description": 1, "user": 1}});
        //console.log(plst);
        return plst;

      case "videoclip":
        var vclp = VideoClips.findOne({_id: id});
        return vclp;

      case "bandimage":
        var img = Interprets.find({_id: id}, {fields: {"avatar": 1}})
        return img.avatar;

      case "bandname":
        var bndNm = Interprets.find({_id: id}, {fields: {"name": 1}});
        //console.log(bndNm);
        return bndNm.name;

      case "avatar":
        var ava = Meteor.users.findOne({_id: id}, {fields: {"profile.avatar": 1}});
        //console.log(ava);
        return ava.profile.avatar;

      case "username":
        var usrNm = Meteor.users.findOne({_id: id}, {fields: {"username": 1}});
        return usrNm.username;

      case "video":
        var vid = videos.findOne(
          {_id: id}, 
          {fields:{
            "avatar": 1, 
            "title": 1, 
            "subtitle": 1, 
            "description": 1, 
            "interpret": 1, 
            "location": 1}
          }
        )
        return vid;

    }

    
  }
})
