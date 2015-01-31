Session.set("currentLocation", "Augsburg");
Session.set("currentGPS", null);
Session.set("gpsRadius", 3);
Session.set("locationPrompt", false);
Session.set("overlayHandler", "none");
Session.set("currentPlaylist", {title:"Some title", videos: []});
Session.set("cameraActive", false);

getNavigatorGeo();

function getNavigatorGeo() {
   	if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);

    } else { 
        console.log("Geolocation is not supported by this browser.");
        /* Execute some other function here */
        Session.set("locationPrompt", true);
	}
}
   
function showPosition(position) {
    //console.log("Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude);

    var coords = [position.coords.latitude, position.coords.longitude];

    Session.set("currentGPS", coords);

}

$(window).on('resize', function(){

  if($(this).width() < 950){

    Session.set("smallScreen", true)
  }
  else{

    Session.set("smallScreen", false)

  }

});


function proposeMembership(){


}

function loadPlaylist(id){

  if(id){

    var playlist = Playlists.findOne({_id: id})

    Session.set("currentPlaylist", playlist);

  }
}

function addVidToPlaylist(id){

  if(id){

    var list = Session.get("currentPlaylist");
    list.videos.push(id);
    Session.set("currentPlaylist", list);
  }
}

function setOptionFields(obj, arrayElement){

  var allOptions = [];
  obj.forEach(function(topVal){

    var group = {};
    var elements = [];

    topVal[arrayElement].forEach(function(subVal){

      var lVObj = {label: subVal, value: subVal};

      elements.push(lVObj);

    });

    group.optgroup = topVal.name;
    group.options = elements;

    allOptions.push(group);

  });

  return allOptions;


}


function clientRegisterValidation(username, email, password, confirmPassword){

  var validPassword;
  var validEmail;
  var validUsername;

  var emailMessage;
  var passwordMessage;
  var usernameMessage;

  var usernameRegex = /^[a-z0-9A-Z_\s]{3,15}$/
  var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


  //Check if Username is taken or too Short 
  if(username.length < 4){

    validUsername = false;
    usernameMessage = "Username zu kurz";
  } else if(username.lenghth > 15){

    validUsername = false;
    usernameMessage = "Username zu lang";

  } else if(Meteor.users.findOne({username: username})){

    validUsername = false;
    usernameMessage = "Username existiert bereits";

  } else if(!usernameRegex.test(username)){

    validUsername = false;
    usernameMessage = "*** nicht erlaubt";

  } else{

    validUsername = true;
    usernameMessage = "Username ist in Ordnung";
  }

  //Check the Email Address
  if(!emailRegex.test(email)){

    validEmail = false;
    emailMessage = "Die Email Adresse ist fehlerhaft";
  } else {

    validEmail = true;
    emailMessage = "Email Adresse ist in Ordnung";
  }

  //Check the Password
  if(password.length <= 6){

    validPassword = false;
    passwordMessage = "Das Passwort ist zu kurz";
  } else if(password != confirmPassword){

    console.log(password);
    console.log(confirmPassword);

    validPassword = false;
    passwordMessage = "Die Passwörter stimmen nicht überein";

  } else if(password == confirmPassword && password.length > 6){

    validPassword = true;
    passwordMessage = "Das Passwort ist in Ordnung";
  }

  return {username: {valid: validUsername, message: usernameMessage}, email: {valid: validEmail, message: emailMessage}, password:{valid: validPassword, message: passwordMessage}};


}
