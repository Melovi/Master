Meteor.publish("Interprets", function(){
	try{
		
		return Interprets.find({});

	} catch(err){

		console.log(err)
	}

});