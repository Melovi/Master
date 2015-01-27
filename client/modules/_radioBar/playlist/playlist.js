var playlistTitle = "";

Template.playlist.helpers({
	listElement:function(){
		playlist = Session.get("currentPlaylist");


		/*var extPlaylist = [];
		i = 0;

		console.log(playlist);

		playlist.videos.forEach(function(value){

			var meta = videos.findOne({_id: value});			
			var id = meta._id;
			var title = meta.title;
			var interpret = meta.interpret;
			var location = meta.location;
			var allInfo = {id: id, title: title, interpret: interpret, location: location, position: i};
			extPlaylist.push(allInfo);
			i++;
		});

		i = 0;*/


		return _.map(playlist.videos, function(val, index){
				return {index: index, value: val};
			});
	},
	activeSong:function(){
		if(this.position == Session.get("queue")){

			return true;
		}
	},
	currentPlaylist:function(){

		return Session.get("currentPlaylist");
	}
});

Template.playlist.events({

	'click .removeVid':function(event, template){

		var playlist = Session.get("currentPlaylist");
		var index = parseInt(event.currentTarget.id);

		console.log(playlist);
		
		playlist.videos.splice(index, 1);
		console.log(playlist);

		Session.set("currentPlaylist", playlist);
		
		if(index < playlist.length-1){
			Session.set("queue", index+1);

		} else if(index > 0){
			Session.set("queue", index-1);
			}
	},

	'click .vidUp':function(event){

		var playlist = Session.get("currentPlaylist");
		var index = parseInt(event.currentTarget.id);

		if(index > 0){

			//console.log("Current Target: " + index);

			var oldVal = playlist.videos[index];

			playlist.videos.splice(index, 1);
			playlist.videos.splice(index-1, 0, oldVal);

			//console.log(playlist);

			Session.set("currentPlaylist", playlist);
			Session.set("queue", index-1);

		}

		
	},
	'click .vidDown':function(event){

		var playlist = Session.get("currentPlaylist");
		var index = parseInt(event.currentTarget.id);

		if(index < playlist.videos.length-1){

			//console.log("Current Target: " + index);

			var oldVal = playlist.videos[index];

			playlist.videos.splice(index, 1);
			playlist.videos.splice(index+1, 0, oldVal);

			//console.log(playlist);

			Session.set("currentPlaylist", playlist);
			Session.set("queue", index+1);

		}
	},
	'click .meta':function(event){

		//console.log("doin smth");

		var index = parseInt(event.currentTarget.id);

		Session.set("queue", index);
	},
	'click #savePlaylist':function(event, template){

		playlistTitle = template.find("#playListTitle").value;

		$( "#fastEditPlaylist" ).slideDown( "slow", function() {
			$("#submitTitle").val(playlistTitle);
		    //console.log("animation complete");
		  });		
	},
	"click #overwrite":function(event, template){		

		var playlist = Session.get("currentPlaylist");		
		var pId = playlist["_id"];

		var exists = Playlists.findOne({_id: pId});

		if(exists && exists.user == Meteor.userId()){

			Playlists.update({_id: pId}, {$set:{videos: playlist.videos, title: playlist.title, description: playlist.description}}, function(err){
				if(err){
					console.log("err");
				} else {
					alert("Playlist aktualisiert")
				}
			});

		} else {

			alert("Keine Playlist zum überschreiben oder nicht eigentümer");
		}		
	},
	'click #closePlaylist':function(event, template){

		$( "#playlistContainer" ).slideUp( "slow", function() {
		    Session.set("playlistActive", false);
		  });				
	}/*
	Hier Draggable Playlist implementieren
	,
	'ondrag #head':function(event, template){

		console.log("doing smth")

		$('#head')
        .bind('drag',function( event ){
                $('#playlistContainer' ).style({
                        top: event.offsetY,
                        left: event.offsetX
                        });
                });
	}*/
	
});

Template.fastEditPlaylist.events({
	"click .addTag":function(event, template){

		var field = document.createElement("div");
		field.className = "field tags";

		var actionInput = document.createElement("div");
		actionInput.className = "ui small right action input";

		var input = document.createElement("input");
		input.className = "tag";
		input.placeholder = "tag";

		var button = document.createElement("div");
		button.className = "ui small icon button addTag";

		var icon = document.createElement("i");
		icon.className = "add icon";

		button.appendChild(icon);
		
		actionInput.appendChild(input);
		actionInput.appendChild(button);

		field.appendChild(actionInput);

		//console.log(field);

		template.find(".tags").appendChild(field);

	},
	"click .submit":function(event, template){
		
		var playlistTags = [];

		template.findAll(".tag").forEach(function(val){

			playlistTags.push(val.value);
		});

		var query = {};
		
		query.title = template.find("#submitTitle").value;		
		query.description = template.find("#playlistDescription").value;		
		query.videos = Session.get("playlist");		
		query.tags = playlistTags;
		query.location = Meteor.user().profile.location || "Augsburg";

		//console.log(query);

		addPlaylist(query);

		$( "#fastEditPlaylist" ).slideUp( "slow", function() {
		    $("input").val("");
		  });
	},
	"click .cancel":function(event, template){

		$( "#fastEditPlaylist" ).slideUp( "slow", function() {
		    //console.log("animation complete");
		  });
	}
})