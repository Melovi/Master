Template.singleVideo.rendered = function(){

	$('.label').popup();
	$('.dimmer').dimmer({on: 'hover'});
}


Template.singleVideo.events({
	'click .addToPlaylist':function(event){
		var myPlaylist = Session.get("playlist");

		myPlaylist.push(this._id);

		Session.set("playlist", myPlaylist);
	},
	'click .playSong':function(event){

		var myPlaylist = [];

		myPlaylist.push(this._id);

		Session.set("playlist", myPlaylist);
	},
	'click .favorite':function(event, template){

		var query = {}
		query.id = this._id;
		query.title = this.title;
		query.interpret = this.interpret;

		addFavorite("video", query);
	}
})