Meteor.publish("userProfiles", function(){
	if(this.userId){
		return Meteor.users.find({}, {fields: {"username": 1, "profile": 1 }})
	} else{
		console.log("user not logged in, aborting");
	}
})