//Controls for Audio
bpmTracker = new BpmTracker;
Event = new EventEmitter;

function playAudio(){

	var audio = $("#mainAudio")[0];

	if(audio.src){

		if(Session.get("isPlaying")){

			Session.set("isPlaying", false);
			audio.pause();
			bpmTracker.pause();
			
			
		} else {

			Session.set("isPlaying", true);
			audio.play();
			bpmTracker.activate();

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
			Meteor.setTimeout(function(){console.log("Waiting"); playAudio();}, 50);

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


function BpmTracker(){

	var beatsPerSecond;
	var beatsPerMiliSecond;
	var currentBeat = 0;
	var correctAtBeat = 15;
	var audio;
	var tracker;
	var pause;
	var interval;
	var correction = false;
	var myClips;

	this.setup = function(bpm){

		console.log("setting up beatTracker");
		beatsPerSecond = bpm/60;
		beatsPerMiliSecond = beatsPerSecond * 1000;
		interval = beatsPerMiliSecond;

	}	

	this.activate = function(){

		console.log("activating beattracker");				
		startTracker(interval);
		audio = $("#mainAudio")[0];

	}

	this.pause = function(){

		clearInterval(tracker);
		interval = audio.currentTime - currentBeat*beatsPerSecond;
		console.log("Interval after Pause " + interval);
		correction = true;
		
	}
	
	this.reset = function(){

		clearInterval(tracker);

	}

	function startTracker(timeInterval){

		if(correction){

			tracker = setInterval(function(){

				console.log(audio.currentTime);
				currentBeat++;
				cyclePlayer();
				correction = false;
				clearInterval(tracker);
				startTracker(beatsPerMiliSecond);

			}, timeInterval);

		} else {

			tracker = setInterval(function(){

				if(currentBeat % correctAtBeat == 0 || currentBeat == 0){

					//console.log("went into correction test");
					correctBeat(audio.currentTime);

				} else{

					console.log(audio.currentTime);					
					currentBeat++;
					cyclePlayer();
					
					//console.log("Current Beat " + currentBeat);				
				}			

		}, timeInterval);

		}

		
	}

	function correctBeat(timelog){

		var supposed = beatsPerSecond * (currentBeat+1);
		var actual = timelog;

		if(Math.abs(supposed - actual) > 0.1){

			//console.log("correcting");
			correction = true;

			if(supposed > actual){
				interval = (supposed - actual) * 1000;
			} else {
				intveral = (Math.abs(supposed - actual)) * 1000;
			}

			//console.log("Correctional Interval " + interval);
			clearInterval(tracker);
			startTracker(interval);

		} else{

			//console.log("no correction");
			currentBeat++;
			cyclePlayer();
			
		}

	}

	function cyclePlayer(){

		Event.emit("cycle",{
			beat: currentBeat
		});

		//currentPlayer = Session.get("currentPlayer");

		//console.log("Current clip: " + Cliploader.cClip);

		//console.log("clips: " + myClips.length);

	}

}