Session.set("clipLimit", 0);
Session.set("firstPlayerClip", 0);
Session.set("secondPlayerClip", 1);
Session.set("thirdPlayerClip", 2);
Session.set("clipQueue", []);
Session.set("beats", []);
var placeholder;

Template.mPlayer.rendered = function(){

	placeholder = $("#videoPlaceHolder");
	$("#player_1").hide();
	$("#player_2").hide();
	$("#player_3").hide();

	Event.on("beat", doit);

	function doit(beat){

		beat = [beat.time, beat.next];
		console.log(beat);
		Session.set("beats", beat);
	}

}

Template.mPlayer.helpers({
	queue:function(){

		//console.log("this video ID: " + this._id);

		return makeFsQueue(this.bpm, this._id);

	},

	playMe:function(start, end, id){
		
		
		//console.log("start function");
		var jClip = $("." + id);		
		var clip = jClip.get(0);
		var active;
		var currentTime = Session.get("audioCurrentTime");
		var beat = Session.get("beats");
		//console.log(currentTime);
		var inbetweenPlay = currentTime > start && currentTime < end;
		//console.log(inbetween);
		var inbetweenBeat = (beat[0] +1) > start && (beat[0] - 1) < start;
		
		

		if(clip){
			if(clip.paused && inbetweenPlay){
				console.log("The Clip is inbetween it: " + inbetweenBeat);
				console.log("Start: " + start + " -- End: " + end);		
				console.log("play clip " + id + " at " + currentTime);
				clip.play();		
			
			} 

			if(!clip.paused){

				if(inbetweenBeat && jClip.css("display") == "none"){
					
						console.log("The Clip is hidden");
						console.log("--- Hide Placeholder show Video at " + currentTime);
						placeholder.hide();
						jClip.show();
						active = true;
										
				}
				
				if(Math.abs(end - beat[0]) <= Math.abs(end - beat[1])){

					//console.log(beat);
					console.log("--- showing placeholder at " + currentTime);
					placeholder.show();				
					
					jClip.hide();
					active = false;			
					
				}

				if(active === false && currentTime > end){

					
					loadClips(clip.id, jClip);
					clip.pause();						

				}	

			}			
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


function makeFsQueue(bpm, videoId){

	var beat = (bpm/60);
	var queue = [];
	var durationLimit = beat;

	for(var i = 0; i < 200; i += beat){

		var j = i+beat;
		//console.log("beat  " + i);
		//console.log("Checke ob größer als --" + i + "-- und kleiner als --" + j);
		var meta = Clips.findOne(
			{"videoId": videoId, "startPosition": {"$gte": i, '$lte': j}, "duration": {"$gte": durationLimit}}, 
			{sort: {"startPosition": 1, "createdAt": -1}}
			);
		//console.log(meta);
		if(meta && "clipRef" in meta){
			//console.log("gefunden");
			var clipRef = meta.clipRef;
			//console.log("Reference");
			//console.log(clipRef);
			var clip = VideoClips.findOne({"_id": clipRef});
			//console.log("Clip: ");
			//console.log(clip)		

			if(clip){
				//console.log("pushing clip");
				queue.push(clip._id);
			}
		}	
		
	}

	//console.log(queue);

	Session.set("clipQueue", queue);

	//handler noch einbauen um zu checken ob alles funktioniert hat

	return true;

}
/*
Event.on("beat", function(beat){
					if(end - beat.time <= end - beat.next){

						console.log("time to switch");
					}
				})


	*/

function loadClips(id, jClip){
	switch(id){

		case "player_1":							
			var inc = Session.get("firstPlayerClip") + 3;
			Session.set("firstPlayerClip", inc);
			jClip.hide();
			break;


		case "player_2":
			var inc = Session.get("secondPlayerClip") + 3;
			Session.set("secondPlayerClip", inc);
			jClip.hide();
			break;


		case "player_3":
			var inc = Session.get("thirdPlayerClip") + 3;
			Session.set("thirdPlayerClip", inc);
			jClip.hide();
			break;

	}

}