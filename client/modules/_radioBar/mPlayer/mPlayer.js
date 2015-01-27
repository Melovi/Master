Session.set("clipLimit", 0);
Session.set("firstPlayerClip", 0);
Session.set("secondPlayerClip", 1);
Session.set("thirdPlayerClip", 2);
Session.set("clipQueue", []);


Template.mPlayer.helpers({
	queue:function(){

		console.log("this video ID: " + this._id);

		return makeFsQueue(120, this._id);

	},

	playMe:function(start, end, id){
		
		//console.log("start function");
		var clip = $("." + id).get(0);
		var currentTime = Session.get("audioCurrentTime");
		//console.log(currentTime);
		var inbetween = currentTime > start && currentTime < end;
		//console.log(inbetween);
		
		
			if(clip.paused && inbetween){
				console.log("play clip " + id);
				clip.play();
				playing = true;
				console.log(playing);

			} 

			if(!clip.paused && currentTime > end){
				console.log("ending clip " + id);
				
				console.log(clip.id);
				switch(clip.id){

					case "player_1":
						console.log("doin smth");
						var inc = Session.get("firstPlayerClip") + 3;
						Session.set("firstPlayerClip", inc);
						break;


					case "player_2":
						var inc = Session.get("secondPlayerClip") + 3;
						Session.set("secondPlayerClip", inc);
						break;


					case "player_3":
						var inc = Session.get("thirdPlayerClip") + 3;
						Session.set("thirdPlayerClip", inc);
						break;

				}
				clip.pause();
				playing = false;
			}
	},


	//secondAttempt
	firstPlayer:function(){

		var queue = Session.get("clipQueue");
		var id = queue[Session.get("firstPlayerClip")];
		var fsFile = VideoClips.findOne({"_id": id});
		var meta = Clips.findOne({"clipRef": id});
		delete meta["_id"];

		_.extend(fsFile, meta);
		
		return fsFile;

	},
	secondPlayer:function(){


		var queue = Session.get("clipQueue");
		var id = queue[Session.get("secondPlayerClip")];
		var fsFile = VideoClips.findOne({"_id": id});
		var meta = Clips.findOne({"clipRef": id});
		delete meta["_id"];

		_.extend(fsFile, meta);
		
		return fsFile;

	},
	thirdPlayer:function(){


		var queue = Session.get("clipQueue");
		var id = queue[Session.get("thirdPlayerClip")];
		var fsFile = VideoClips.findOne({"_id": id});
		var meta = Clips.findOne({"clipRef": id});
		delete meta["_id"];

		_.extend(fsFile, meta);
		
		return fsFile;

	}

});

function makeQueue(bpm, videoId){

	var beat = 2*(bpm/60);
	var queue = [];

	for(var i = 0; i < 200; i += beat){

		var j = i+beat;
		//console.log("beat  " + i);
		var meta = Clips.findOne({"videoId": videoId, "startPosition": {'$lt': j, "$gt": i}}, {sort: {"startPosition": 1}});
		

		if(meta){
			//console.log("pushing clip");
			queue.push(meta);
		}
		
	}

	//console.log(queue);

	return queue;

}

function makeFsQueue(bpm, videoId){

	var beat = (bpm/60);
	var queue = [];

	for(var i = 0; i < 200; i += beat){

		var j = i+beat;
		//console.log("beat  " + i);
		console.log("Checke ob größer als --" + i + "-- und kleiner als --" + j);
		var meta = Clips.findOne(
			{"videoId": videoId, "startPosition": {"$gte": i, '$lte': j}}, 
			{sort: {"startPosition": 1, "createdAt": -1}}
			);
		console.log(meta);
		if(meta && "clipRef" in meta){
			console.log("gefunden");
			var clipRef = meta.clipRef;
			//console.log("Reference");
			//console.log(clipRef);
			var clip = VideoClips.findOne({"_id": clipRef});
			//console.log("Clip: ");
			console.log(clip)		

			if(clip){
				//console.log("pushing clip");
				queue.push(clip._id);
			}
		}	
		
	}

	console.log(queue);

	Session.set("clipQueue", queue);

	//handler noch einbauen um zu checken ob alles funktioniert hat

	return true;

}