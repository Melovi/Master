
Meteor.publish("Videos", function(){
	try{
		return videos.find({});
	}catch(err){

		console.log(err);
	}
})