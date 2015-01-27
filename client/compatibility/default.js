Session.set("currentLocation", "Augsburg");
Session.set("currentGPS", null);
Session.set("gpsRadius", 3);
Session.set("locationPrompt", false);
Session.set("overlayHandler", "none");
Session.set("currentPlaylist", {title:"Some title", videos: []})

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
