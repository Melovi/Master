Meteor.publish("Clips", function(){
	try{

		console.log("publishing clips");
		return Clips.find({});
	}catch(err){

		console.log(err);
	}
})