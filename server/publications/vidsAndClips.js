Meteor.publish("vidsAndClips", function (vidId) {
	try{
		
		
	  	return[
		  	videos.find({_id:vidId}),
		  	Clips.find({videoId:vidId},{sort:{start:1}})
		  	];
	  	
	}
	catch(err){
		console.error("------------ Problem ---------------");
		console.error("------------ Vids and Clips ---------------");
		console.log(err);
	}
	
});
