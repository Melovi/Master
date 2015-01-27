//Controls for Audio

function playAudio(){

	var audio = $("#mainAudio")[0];

	if(audio.src){

		if(Session.get("isPlaying")){

			Session.set("isPlaying", false);
			//BpmTracker.activate(audio);
			audio.pause();
			
			
		} else {

			Session.set("isPlaying", true);
			//BpmTracker.activate(audio);
			audio.play();

		}

	} else {

		alert("Noch kein Audio eingetragen! Wähle einen Track aus!")
	}  
}

function switchLoop(loopStatus){

	if(loopStatus == "none"){
		Session.set("repeater", "oneSong");
		console.log("Repeat only one Song")
	}
	else if (loopStatus == "oneSong"){
		Session.set("repeater", "playlist");
		console.log("Repeat entire Playlist");
	}
	else if(loopStatus == "playlist"){
		Session.set("repeater", "none");
		console.log("Repeater turned off");
	}

};


function playNextSong(){

	var currentcue = Session.get("queue");
	var playlist = Session.get("playlist");
	var loopStatus = Session.get("repeater");	
	var audio = $("#mainAudio")[0];

	if(Session.get("isPlaying")){
		audio.pause();
	}
	else{
		Session.set("isPlaying", true);
	}

	if(loopStatus == "none"){

		if(currentcue < playlist.length - 1){
			currentcue++;
			console.log("Increment the Cue by one");
			Session.set("queue", currentcue);
			Meteor.setTimeout(function(){console.log("Waiting"); audio.play();}, 50);

		} else {

			Session.set("isPlaying", false);
			console.log("The Queue is finished")
		}
	}

	else if (loopStatus == "oneSong"){
			
		audio.load();
		console.log("Loaded Audio");
		audio.play();
		console.log("playing Audio");
	}

	else if(loopStatus == "playlist"){

		if(currentcue < playlist.length - 1){

			currentcue++;
			console.log("Increment the Cue by one");
		}

		else{

			//Passiert wenn die Playlist zuende ist,
			//hier später dynamischen code
			currentcue = 0;
		}

		Session.set("queue", currentcue);
		Meteor.setTimeout(function(){console.log("Waiting"); audio.play();}, 50);
	}	
	
}