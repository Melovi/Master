Meteor.publish("Genres", function(){
	try{
		

		return Genres.find({});
	}catch(err){

		console.log(err)
		console.log("Error while loading Genres");
	}
})