
Template.favorites.events({

	'click .removePlaylist':function(event, template){

		if(confirm("Delete Playlist " + this.title + "?")){
				
			//console.log(this._id);

			Meteor.users.update({_id: Meteor.userId()}, {$pull: {"profile.playlists": this._id}})
		}
	},
	'click .removeFav':function(event, template){

		if(confirm("Delete " + this.title + " from Favorites?")){
			removeFavorite("id", this.id, "video");
		}
		
	},
	'click .removeLoc':function(event, template){

		if(confirm("Delete " + this.title + " from Favorites?")){
			removeFavorite("id", this.id, "location");
		}

	},
	'click .removeBand':function(event, template){

		if(confirm("Delete " + this.name + " from Favorites?")){
			removeFavorite("id", this.id, "band");
		}

	},
	'click .favorite':function(event, template){

		//console.log(this.id);

		Router.go("/videos/" + this.id);
	},
	'click .playPlaylist':function(event, template){

		

		if(confirm("Load this playlist?")){

			loadPlaylist(this._id);
		}
	},
	'click .playSong':function(event, template){

		var myPlaylist = [];

		myPlaylist.push(this.id);

		Session.set("isPlaying", false);
		Session.set("playlist", myPlaylist);

		Meteor.setTimeout(function(){console.log("Waiting"); playAudio()}, 50);
	}

});