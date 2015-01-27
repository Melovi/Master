Session.set("ownRecordingsAmout", 6)
Session.set("newRecordingsAmount", 4);
Session.set("popularRecordingsAmount", 4);

Template.recordings.helpers({
	myRecordings:function(){

		var myRecordings = Clips.find({"user": Meteor.userId()}, {limit: Session.get("ownRecordingsAmout")});
		var modified = [];
		var i = 0;
		myRecordings.forEach(
			function(row){
				//console.log(row.videoId);
				var vid = videos.findOne({_id: row.videoId}, {title: 1, interpret: 1});

				//console.log(vid);

				row.videoTitle = vid.title;
				row.videoInterpret = vid.interpret;

				//console.log(row);

				modified[i] = row;

				i++;

		});

		//console.log(modified);
		
		return modified;
	},
	newRecordings:function(){

		var newRecordings = Clips.find({}, {sort: {createdAt: -1}, limit: Session.get("newRecordingsAmount")}).fetch();
		var modified = [];
		var i = 0;
		newRecordings.forEach(
			function(row){
				//console.log(row.videoId);
				var vid = videos.findOne({_id: row.videoId}, {title: 1, interpret: 1});

				//console.log(vid);

				row.videoTitle = vid.title;
				row.videoInterpret = vid.interpret;

				//console.log(row);

				modified[i] = row;

				i++;

		});

		console.log(modified);


		return modified;
	},
	popularRecordings:function(){

		var popularRecordings = Clips.find({}, {sort: {"lovs.count": -1}, limit: Session.get("popularRecordingsAmount")})
		var modified = [];
		var i = 0;
		popularRecordings.forEach(
			function(row){
				console.log(row.videoId);
				var vid = videos.findOne({_id: row.videoId}, {title: 1, interpret: 1});

				console.log(vid);

				row.videoTitle = vid.title;
				row.videoInterpret = vid.interpret;

				console.log(row);

				modified[i] = row;

				i++;

		});

		console.log(modified);


		return modified;
	}
});

Template.recordings.events({
	"click .favorite":function(){

		query = {};
		query.id = this._id;
		query.title = "placeholder";
		query.createdAt = this.createdAt;
		query.description = this.description;
		query.tags = this.tags;

		console.log(query);

		addFavorite("clip", query);
	},
	"click .expandList":function(event){

		switch(event.currentTarget.id){

			case "ownClips":
				var more = Session.get("ownRecordingsAmout");
				more += 6;
				Session.set("ownRecordingsAmout", more);
				break;

			case "popularClips":
				var more = Session.get("popularRecordingsAmount");
				more += 6;
				Session.set("popularRecordingsAmount", more);
				break;

			case "newClips":
				var more = Session.get("newRecordingsAmount");
				more += 6;
				Session.set("newRecordingsAmount", more);
				break;

			default:
				alert("did not match any case");
		}
	},
	"click .lovThis":function(event){			

		addLov("clip", this._id);
	},
	"click .videoCard":function(event){
		console.log("doin smth");

		//event.currentTarget.src = this.url;

		event.currentTarget.play();		
	}
})