var newLocation = Session.get("currentLocation");

Template.setLocation.helpers({

	//diese Ganzen Funktionen in die Navigation verwurschteln
	myCity:function(){

		var myGPS = Session.get("currentGPS");

		if(myGPS != null){

			//console.log("running findcity func")

			locations = Locations.find().fetch();

			currentLocation = findNextCity(locations, myGPS);

			Session.set("currentLocation", currentLocation);

			return findNextCity(locations, myGPS);
		}
		

	},

	cities:function(){

		locations = Locations.find();

		return locations;
	}
});

Template.setLocation.events({
	'change select':function(event, template){

		//console.log("New City: " + event.currentTarget.value);

		if(event.currentTarget){


			newLocation = event.currentTarget.value;
		}

	},
	'click .confirm':function(){

		Session.set("currentLocation", newLocation);
		Session.set("overlayHandler", "none");
	},

	'click .cancel, click .overlay':function(){

		Session.set("overlayHandler", "none");
	}
})

function findNextCity(collection, currentGPS){

	myGPS = currentGPS;
	x_gps = myGPS[0];
	y_gps = myGPS[1];
	rad = Session.get("gpsRadius");

	//console.log("Current X Location: " + x_gps + " Y Location: " + y_gps);
	//console.log("Radius is: " + rad);

	cityName = "Augsburg";

	collection.forEach(function(value){

		x_center = value.gps[0]["x_coordinate"];
		y_center = value.gps[0]["y_coordinate"];

		//console.log("City: " + value.name + "--- Center: x:" + x_center + "- y: " + y_center);

		if(checkIfInRadius(x_center, y_center, x_gps, y_gps, rad)){

			cityName =  value.name;
		}
	});

	

	return cityName;

}

function checkIfInRadius(x_center, y_center, x_gps, y_gps, rad){

	firstTerm = Math.pow((x_gps - x_center), 2);
	secondTerm = Math.pow((y_gps - y_center), 2);
	rad2 = Math.pow(rad, 2);

	//console.log("F: " + firstTerm + " + S: " + secondTerm + " is smaller than: " + rad2);

	if((firstTerm + secondTerm) < rad2){
		console.log("the City is in there");
		return true;
	} 
	else {
		return false
	}

}