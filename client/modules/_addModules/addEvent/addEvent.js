Template.addEvent.rendered = function(){

	$(".ui.dropdown").dropdown();
}

Template.addEvent.events({
	"click .submit":function(event, template){

		event.preventDefault();

		var date = template.find("#date").value + "T" + template.find("#time").value;
		var query = {};
		var address = {};
		var user = {id: Meteor.userId(), name: Meteor.user().username, avatar: Meteor.user().profile.avatar};
		var participants = [{id: Meteor.userId(), name: Meteor.user().username, avatar: Meteor.user().profile.avatar}];

		console.log(participants);

		address.city = template.find("#location").value;
		address.street = template.find("#street").value;
		address.streetNumber = template.find("#streetNumber").value;

		query.name = template.find("#name").value;
		query.subtitle = template.find("#subtitle").value;
		query.description = template.find("#description").value;
		query.date = date;
		query.genre = template.find("#genre").value;
		query.address = address;
		query.participants = participants;
		query.user = user;

		console.log(query);

		UserEvents.insert(query, function(err, doc){

			if(err){
				console.log(err);
			} else {

				alert("Successfully Added");
				Router.go("eventDetail", {id: doc});
			}
		})
		
	}
})