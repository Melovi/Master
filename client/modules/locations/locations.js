Template.locations.events({
	'click a':function(){

		var query = {}
		query.id = this._id;
		query.name = this.name;
		query.description = this.description;

		addFavorite("location", query);
	}
})