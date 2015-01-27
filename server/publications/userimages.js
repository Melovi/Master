Meteor.publish("UserImages", function(){
	console.log("preparing user Images");
	if(this.userId){
		console.log("The user is logged in, showing Pictures");
		return UserImages.find();
	} else {
		console.log("user is not logged in, you may not seeee!!!");
	}
})