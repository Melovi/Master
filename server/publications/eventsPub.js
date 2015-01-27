Meteor.publish("UserEvents", function(){

	try{
		return UserEvents.find({});
	} catch(err){

		console.log(err);
	}
});