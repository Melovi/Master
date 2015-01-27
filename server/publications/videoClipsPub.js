Meteor.publish("VideoClips", function(){

	
	try{
		console.log("publishing VideoClips");
		return VideoClips.find({});
		
	} catch(err){

		console.log("VideoClips:");
		console.log(err);
	}
})