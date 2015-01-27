Meteor.publish("clipAndMeta", function(){
	
	try{

		return [Clips.find({}), VideoClips.find({})]
	} catch(err){

		console.log(err);
	}
})