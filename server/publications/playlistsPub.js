Meteor.publish("Playlists", function(){

	//console.log("publishing playlists");

	try{
		//console.log("returning playlists");
		return Playlists.find({});
		
	} catch(err) {

		console.log(err);
	}
});