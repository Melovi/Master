
Template.discover.rendered = function(){

	$(".dropdown").dropdown();
}

Template.discover.helpers({	

	userEvents:function(){

		return UserEvents.find({"address.city": Session.get("currentLocation")}, {limit: 3, sort: {createdAt: -1}});
	},
	interprets:function(){

		return Interprets.find({location: Session.get("currentLocation")}, {limit: 3, sort: {createdAt: -1}});
	},
	videos:function(){

		return videos.find({location: Session.get("currentLocation")}, {limit: 3, sort: {createdAt: -1}});
	},
	locations:function(){

		return Locations.find({});
	},
	playlists:function(){

		return Playlists.find({location: Session.get("currentLocation")}, {limit: 3, sort: {createdAt: -1}})
	}

});

Template.discover.events({

	"change input":function(event, template){

		Session.set("currentLocation", event.currentTarget.value);
	},
	"click .favorite":function(event, template){

		switch(event.currentTarget.id){

			case "band":
				var query= {};
				query.id = this._id;
				query.name = this.name;

				addFavorite("interpret", query);
				break;
		}
	}
})