Template.addInterpret.rendered = function(){

	$(".ui.dropdown").dropdown();
}

Template.addInterpret.helpers({
	
});

Template.addInterpret.events({

	'click .button':function(event, template){

		event.preventDefault();
		
		var url = "http://www.testimage.com";

		var query = {};

		query.name = template.find("#name").value;
		query.bio = template.find("#bio").value;
		query.location = template.find("#location").value;
		query.genre = template.find("#genre").value;

		console.log(query);

		Interprets.insert(query, function(err, doc){
			if(err){
				console.log(err);
			} else{
				console.log("sucess");
				alert("Dein Bandprofil " + query.name + " wurde erstellt");
				Meteor.users.update({_id: Meteor.userId()}, {$push :{"profile.bands": {id: doc, name: query.name, source:url}}}, function(err){
					if(err){
						console.log(err);
					} else {

						console.log("in userprofil eingetragen");
					}
				})
			}
		})


	}
})