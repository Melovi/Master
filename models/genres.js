var GenreSchema = new SimpleSchema({
	name:{
		type:String
	},
	subgenres:{
		type:[String],
		optional:true
	},
	description:{
		type:String,
		optional:true
	}
})

Genres = new Meteor.Collection("Genres");
Genres.attachSchema(GenreSchema);

