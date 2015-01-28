Template.videomod.rendered = function(){

	$('.label').popup();
	$('.dimmer').dimmer({on: 'hover'});
}


Template.videomod.helpers({
	mostSeenVids:function(){
		return videos.find({},{limit:3, sort:{views: -1}});
	},
	mostLovedVids:function(){

		return videos.find({}, {limit: 3, sort: {lovs: -1}})
	},
	locVids:function(){
		return videos.find({location: Session.get("currentLocation")},{limit:4});
	},
	newVids:function(){
		return videos.find({},{limit:10, sort:{createdAt: -1}})
	}
});

Template.videomod.events({
	'click .addToPlaylist':function(event){
		addVidToPlaylist(this._id);
	},
	'click .playSong':function(event){

		var myPlaylist = [this._id];

		Session.set("isPlaying", false);
		Session.set("playlist", myPlaylist);

		Meteor.setTimeout(function(){console.log("Waiting"); playAudio()}, 50);
	},
	'click .favorite':function(event, template){

		var query = {}
		query.id = this._id;
		query.title = this.title;
		query.interpret = this.interpret;

		addFavorite("video", query);
	}
})