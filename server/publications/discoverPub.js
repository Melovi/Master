Meteor.publish("discover", function (location) {
	

	try{
		
		var arr = [
			videos.find({location:location}),
		  	UserEvents.find({"address.city":location}),
		  	Interprets.find({location:location}),
		  	Playlists.find({location:location})
		]
		
	  	return arr;
	  	
	}
	catch(err){
		console.log("Error at Discover: ");
		console.log(err);
	}
	
});
