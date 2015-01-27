Session.set("searchResults", {});

Template.search.rendered = function (){

	Meteor.subscribe("userProfiles");
};

Template.search.events({
	'keyup .desktopSearch':function(event, template){

		search = event.currentTarget.value;
		query = {$regex: search, $options: "i"};
		options = {limit: 3};


		if(search != ""){

			$(".sidebar").sidebar("show");
			$(".desktopSearch").val(search);

			songs = videos.find({title : query}, options).fetch();
			//Später durch direkte Abfrage in der Datenbank nach Interpreten austauschen
			interprets = Interprets.find({name: query}, options).fetch();
			locations = Locations.find({name: query}, options).fetch();
			genres = Genres.find({name: query}, options).fetch();
			users = Meteor.users.find({username: query}, options).fetch();

			results = {interprets: interprets, songs: songs, locations: locations, genres: genres, users: users };

			Session.set("searchResults", results);


		} else {

			Session.set("searchResults", {});
			$(".sidebar").sidebar("hide");
			$(".desktopSearch").val("");
		}

		
	},

	'click #resetSearch':function(event, template){

		Session.set("searchResults", {});
		template.find("#desktopSearch").value = "";
	}
})