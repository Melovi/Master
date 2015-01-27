
Meteor.publish("Locations", function(){
	try{
		return Locations.find({});
	}catch(err){

		console.log(err)
		console.log("Error while loading Locations");
	}
})