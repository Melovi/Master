Session.set("isUploaded", false);
Session.set("updatedProfile", false);

Template.editProfile.rendered = function(){

	$('.ui.dropdown').dropdown();
}


Template.editProfile.helpers({

	locations:function(){

		var locations = Locations.find();

		return locations;
	},
	image:function(){

		var image = UserImages.find({_id: Session.get("isUploaded")})

		console.log(image);
		
		return image;
	},
	isUploaded:function(){

		return Session.get("isUploaded");
	},
	imageUpdated:function(){

		return Session.get("imageUpdated");
	},
	profileUpdated:function(){

		return Session.get("updatedProfile");
	}
})

Template.editProfile.events({
	'change #profileUpload':function(event, template){
		
		FS.Utility.eachFile(event, function(file) {
			var newFile = new FS.File(file);
			newFile.metadata = {user: Meteor.userId()};
	      UserImages.insert(newFile, function (err, fileObj) {
	        if(err){
	        	console.log(err);
	        } else {

				Session.set("isUploaded", fileObj._id);
	        	console.log("inserted");
	        	console.log(fileObj);
	        		        	
	        }
	      });
	    });

	},
	"click .imageUpload":function(event, template){

		console.log("doin smth");
		var newImage = template.find("#imagePreview").src;
		console.log(newImage);
		Meteor.users.update({_id: Meteor.userId()},{$set: {"profile.avatar": newImage}}, function(err){

			if(err){
				console.log(err);
			} else {

				Session.set("imageUpdated", true);
			}
		})
	},
	"change input, blur textarea":function(event, template){

		console.log(event.currentTarget);

		if(event.currentTarget.id != profileUpload){

			console.log(event.currentTarget.value);
			var selector = "profile."
			var query = {};

			if(event.currentTarget.className == "tag"){

				var arr = event.currentTarget.value.split(",");
				console.log(arr);

				selector += "tags." + event.currentTarget.id;

				query[selector] = arr;

			} else {

				selector += event.currentTarget.id;

			
				query[selector] = event.currentTarget.value;

			}		

			console.log(query);
			event.currentTarget.value = "";

			Meteor.users.update({_id: Meteor.userId()}, {$set: query}, function(err){
				if(err){

					console.log(err);
				} else {

					Session.set("updatedProfile", true);
					console.log("updated");

				}
			});
		}
	},
	"keydown input":function(){

		console.log("doin smth");
		Session.set("updatedProfile", false);
	}
});
