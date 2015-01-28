Session.set("queue", 0);
Session.set("playlist", []);
Session.set("isPlaying", false);
Session.set("progress", "0%");
Session.set("repeater", "none");
Session.set("videoVisible", false);
Session.set("currentPlayer", 1);
Session.set("playlistActive", false);
Session.set("audioCurrentTime", 0);

Template.radio.helpers({

	collectionsReady:function(){

		if(Meteor.subscribe("Videos").ready() && Meteor.subscribe("Locations").ready() && Meteor.subscribe("Genres").ready()){

			return true;

		} else {

			return false;
		}    	
    	
    },
    audio:function(){
    	audio = videos.findOne({_id:Session.get("playlist")[Session.get("queue")]});    	

    	if(audio){
    		Session.set("currentVideo", audio._id);

			bpmTracker.setup(audio.bpm);
    	}
    	
    	
    	return audio;
    },

    isPlaying:function(){
		
		return Session.get("isPlaying");

	},
	timelineWidth:function(){

		return Session.get("progress");
	},
	videoVisible:function(){
		return Session.get("videoVisible");
	},
	currentVideo:function(){

		if(Session.get("currentVideo")){

			return Session.get("currentVideo");
		}
	},
	activeIfPlayerIs:function(player){
		var currentPlayer = Session.get("currentPlayer");

		return player == currentPlayer ? "active" : "hidden";
	},
	firstPlayerUrl:function(){

		return Session.get("clipPlayer_1");
	},
	secondPlayerUrl:function(){

		return Session.get("clipPlayer_2");

	},
	thirdPlayerUrl:function(){

		return Session.get("clipPlayer_3");

	}
});


Template.radio.events({

	"click a":function(event, template){

		switch(event.currentTarget.id){

			case "mainPlay":
				playAudio();
				break;

			case "mainPause":
				playAudio();
				break;

			case "mainForward":
				playNextSong();
				break;

			case "mainLoop":
				switchLoop(Session.get("repeater"));
				break;

			case "mainPlaylist":
				if(Session.get("playlistActive")){

					$( "#playlistContainer" ).slideUp("slow", function(){
						Session.set("playlistActive", false);
					});

				} else {

					$( "#playlistContainer" ).slideDown("slow", function(){
						Session.set("playlistActive", true);
						console.log("done");
					});					
				}
				
				break;

			case "mainVideo":
				Session.get("videoVisible") ? Session.set("videoVisible", false) : Session.set("videoVisible", true);
				
				break;

		}


	},

	'timeupdate audio':function(event, template){
		audio = template.find("audio");
		trackposition = 100 * (audio.currentTime / audio.duration);
		progress = trackposition + "%";
		Session.set("audioCurrentTime", audio.currentTime);
		Session.set("progress", progress);        
	},
	'ended audio':function(event, template){

		playNextSong(template);

	}

});



/*
function Cliploader(){

	var clipUrls;
	var currentClip;

	this.setup = function(arr){

		clipUrls = arr;
		currentClip = 0;
		Session.set("clipPlayer_1", clipUrls[0]);
		Session.set("clipPlayer_2", clipUrls[1]);
		Session.set("clipPlayer_3", clipUrls[2]);
		this.cClip = currentClip;	
	}

	this.nextClip = function(){

		currentClip++;
		this.cClip = currentClip;	

		if(currentClip < clipUrls.length-1){

			//console.log("switching");
			switch(Session.get("currentPlayer")){
				case 1:
					Session.set("clipPlayer_3", clipUrls[currentClip+1]);
					break;
				case 2:
					Session.set("clipPlayer_1", clipUrls[currentClip+1]);
					break;
				case 3:
					Session.set("clipPlayer_2", clipUrls[currentClip+1]);
					break;
			}
		} else {

			currentClip = 0;
		}		
	}	
	
}
*/



var clips = [
	{
		title: "Heyho",
		url: "http://videos.mozilla.org/serv/webmademovies/atultroll.webm",
		startPosition: 0,
		length: 3,
		endPosition: 3,
		user: "Some guy",
		lovs: 5,
		flagged: 0,
		tags: ["tag 1", "tag 2"],
		createdAt: ""
	},
	{
		title: "Whats",
		url: "http://videos.mozilla.org/serv/webmademovies/justintime.ogv",
		startPosition: 2,
		length: 4,
		endPosition: 6,
		user: "Another Guy",
		lovs: 7,
		flagged: 0,
		tags: ["tag 1", "tag 2"],
		createdAt: ""
	},
	{
		title: "Up",
		url: "http://videos.mozilla.org/serv/webmademovies/popcornplug.mp4",
		startPosition: 5,
		length: 3,
		endPosition: 8,
		user: "Dis Dude",
		lovs: 1,
		flagged: 0,
		tags: ["tag 1", "tag 2"],
		createdAt: ""
	},
	{
		title: "Here",
		url: "http://www.quirksmode.org/html5/videos/big_buck_bunny.mp4",
		startPosition: 9,
		length: 5,
		endPosition: 14,
		user: "Some guy",
		lovs: 5,
		flagged: 0,
		tags: ["tag 1", "tag 2"],
		createdAt: ""
	},
	{
		title: "Bro",
		url: "http://video-js.zencoder.com/oceans-clip.mp4",
		startPosition: 13,
		length: 6,
		endPosition: 19,
		user: "Some guy",
		lovs: 5,
		flagged: 0,
		tags: ["tag 1", "tag 2"],
		createdAt: ""
	}
];