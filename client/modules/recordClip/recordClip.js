//--------------------------------------------------------------------------------------------
//Funktionen zum Recording

var hold = 0;
var t;
var start;
var clipTitle = "";
var clipTags = [];
var myVid;
Session.set("isRecording", false);
Session.set("recordingComplete", false);
Session.set("editPositions", {position: 50, start: 0.1, end: 100});
Session.set("activeCamera", false);


Template.recordClip.helpers({
	isRecordable:function(){

		if(Session.get("isPlaying")){

			if(Session.get("activeCamera")){

				return "red"
			} else {

				return "blue";
			}

		} else {

			return "disabled"
		}

		
	},
	isRecording:function(){

		return Session.get("isRecording") ? "loading" : "icon";
	},
	recordingComplete:function(){

		return Session.get("recordingComplete");
	}
})

Template.recordClip.events({
	"click #record":function(event, template){

		//console.log("triggered");

		if(!Session.get("activeCamera")){

			$("#camera").slideDown("slow", function(){
				Session.set("activeCamera", true);
			})

			if(!Session.get("isRecording")){

				startRecording();
			
				start = $("#mainAudio")[0].currentTime;				

				t = setInterval(function(){

					//console.log("doin smth");
					hold += 100;

					if(hold >= 10000){

						Session.set("isRecording", false);
						Session.set("recordingComplete", true);
						completeRecording();
						$( "#clipControls" ).show( "slow", function() {
						    console.log("animation complete");
						  });

						clearInterval(t);
					}

				}, 100);

			} else {

				Session.set("isRecording", false);
				Session.set("recordingComplete", true);
				completeRecording();
				clearInterval(t);
			}			
		}
		

		/*if(!Session.get("isRecording")){			

			//console.log("starting");
			
			start = $("#mainAudio")[0].currentTime;
			Session.set("isRecording", true);

			t = setInterval(function(){

				//console.log("doin smth");
				hold += 100;

				if(hold >= 10000){

					Session.set("isRecording", false);
					Session.set("recordingComplete", true);
					$( "#clipControls" ).slideDown( "slow", function() {
					    console.log("animation complete");
					  });

					clearInterval(t);
				}

			}, 100);

		} else {

			Session.set("isRecording", false);
			Session.set("recordingComplete", true);

			clearInterval(t);
		}	*/	

	},
	"click .resetClip":function(){

		Session.set("recordingComplete", false);
		hold = 0;
		start = 0;

		$("#mainAudio")[0].currentTime = start - 2;
		Session.set("isPlaying", false);
		playAudio();

		$( "#clipControls" ).slideUp( "slow", function() {
		    console.log("animation complete");
		  });
	},
	"click .editClip":function(){
				
		$( "#fastEditClip" ).slideDown( "slow", function() {
		    $( "#clipControls" ).slideUp( "slow", function() {
			    //console.log("animation complete");
			  });
		  });
	},
	"click .useClip":function(){

		Session.set("recordingComplete", false);		

		alert("Prototype");
	}
		
})

//--------------------------------------------------------------------------------------------
//Funktionen für den Fast Edit

Template.fastEditClip.helpers({
	editClip:function(){

		if(Session.get("editClip")){

			var fR = VideoClips.findOne({_id: Session.get("editClip")._id});

			if(fR){
				$(".disabled.positive").removeClass("disabled");

				return fR;
			}				
		}
		
	},
	positions:function(){

		var positions = Session.get("editPositions");

		return positions;

	}
});

Template.fastEditClip.events({
	"mousedown .pointer":function(event, template){

		var video = template.find("#previewVideo");

		Session.set("dragging", true);
		var mousePosX = event.pageX;
		var windowWidth = $(window).width();
		var ratio;

		console.log(mousePosX);
		console.log(windowWidth);

		if(Session.get("dragging")){

			var positions = Session.get("editPositions");		

			$(document).mousemove(function(e){
				ratio = e.pageX / windowWidth;

				console.log(video.currentTime);
				console.log("ratio is: --- " + ratio);
				video.currentTime = video.duration * Math.abs(ratio);
				console.log(video.currentTime);

				positions[event.currentTarget.id] = Math.abs(ratio*100);
				Session.set("editPositions", positions);

				$(document).mouseup(function(){
					$(document).off("mousemove");
				})
			})
		}

	},
	"mouseUp":function(){

		Session.set("dragging", false);
	},
	"click .addTag":function(event, template){

		var field = document.createElement("div");
		field.className = "field tags";

		var actionInput = document.createElement("div");
		actionInput.className = "ui small right action input";

		var input = document.createElement("input");
		input.className = "tag";
		input.placeholder = "tag";

		var button = document.createElement("div");
		button.className = "ui small icon button addTag";

		var icon = document.createElement("i");
		icon.className = "add icon";

		button.appendChild(icon);
		
		actionInput.appendChild(input);
		actionInput.appendChild(button);

		field.appendChild(actionInput);

		console.log(field);

		template.find(".tags").appendChild(field);

	},
	"click .submit":function(event, template){
		
		console.log("doin smth");
		var clipTags = [];
		var trim = Session.get("editPositions");
		var video = template.find("#previewVideo");
		var trimStart = video.duration * (trim.start/100);
		var trimEnd = video.duration * (trim.end/100);
		var newDuration = (video.duration - trimStart) - (video.duration - trimEnd);

		template.findAll(".tag").forEach(function(val){

			clipTags.push(val.value);
		});

		var query = {};

		query.clipRef = myVid._id;

		if(query.clipRef){

			query.title = template.find("#clipTitle").value || Meteor.user().username + "'s Clip";
			query.clipRef = myVid._id;
			query.startPosition = start;
			query.endPosition = start + hold/1000;
			query.videoId = Session.get("currentVideo");
			query.user = Meteor.userId();
			query.tags = clipTags;
			query.trimStart = trimStart;
			query.trimEnd = trimEnd
			query.duration = newDuration;

			insertClip(query)

		} else {

			template.find("#urlField").className += " error";
			alert("Entweder eine VideoDatei oder eine URL sind notwendig!")
		}

	},
	"click .cancel":function(event, template){

		if(VideoClips.find({_id: myVid._id})){

			VideoClips.remove({_id: myVid._id});
			
		} 

		$( "#fastEditClip" ).slideUp( "slow", function() {
		    Session.set("recordingComplete", false);
		    Session.set("editClip", "");
		  });
		
	},
	"change #file":function(event, template){	

		FS.Utility.eachFile(event, function(file) {
			var newFile = new FS.File(file);
			newFile.metadata = {user: Meteor.userId(), video: Session.get("currentVideo")};
			
			myVid = VideoClips.insert(newFile, function (err, fileObj) {
			    if(err){
			    	console.log(err);
			    } else {

					Session.set("isUploaded", fileObj._id);
			    	console.log("inserted");
			    	$(".disabled button").removeClass("disabled"); 	
			    		        	
			    }
			  });
			});

		console.log(myVid);
		Session.set("editClip", myVid);
	}
});
//--------------------------------------------------------------------------------------------
//Ab hhier funktionen für die Kamera

var video;
var canvas;
var context;
var localMediaStream;
imageArray = [];
imageBlob = "";

Template.camera.rendered = function(){

	localMediaStream = null;

	video = this.find("#live_video");
	canvas = this.find("canvas");
	context = canvas.getContext("2d");

}

Template.camera.helpers({

	hasCamera:function(){

		if(Session.get("activeCamera")){

			console.log("doin smth");

		navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

		navigator.getUserMedia({video:true, audio: false}, success, errorCallback);

		}
	}
});

Template.camera.events({

	"click .overlay":function(){

		
		$("#camera").slideUp("slow",function(){
			Session.set("activeCamera", false);
		});
	}

})

var errorCallback = function(err){
	console.log(err);
	alert("Es gab ein Problem mit dem Steam. Bitte überprüfen ob die Kamera angeschlossen ist oder der Zugriff im Browser angenommen wurde.");
	
	$("#camera").slideUp("slow",function(){
		Session.set("activeCamera", false);
	});
}

function fallback(err){
	console.log("Es gab ein problem mit dem Laden ");
	//hier eine Fallback option für das Video
}

function success(stream){

	video.src = window.URL.createObjectURL(stream);
	localMediaStream = stream;

	video.onloadedmetadata = function(){

		//do some fancy stuff
	}
}

function startRecording(){

	console.log("start Recording");
	Session.set("isRecording", true);

	canvas.width = video.width;
	canvase.height = video.height;

	recording = true;
	frameTime = new Date().getTime();
	requestAnimationFrame(recordFrame)
}

function recordFrame(){
	if(recording){
		var image;

		var recordVideo = video;
		var width = recordVideo.width;
		var height = recordVideo.height;

		context.drawImage(recordVideo, 0, 0, width, height);

		imageData = context.getImageData(0, 0, width, height);

		var frameDuration = new Date().getTime - frameTime;

		imageArray.push(
		{
			duration: frameDuration,
			image: imageData
		});

		frameTime = new Date().getTime();

		requestAnimationFrame(recordFrame);
	} else {
		completeRecording();
	}
}

function completeRecording(){

	var whammyEncoder = new Whammy.Video();
	for(i in imageArray){
		context.putImageData(imageArray[i].image, 0, 0);
		whammyEncoder.add(context, imageArray[i].duration)
		delete imageArray[i];
	}

	var imageBlob = whammyEncoder.compile();

	var myVid = VideoClips.insert(imageBlob, function(err, fileObj){
		if(err){
			console.log("err");
		} else {
			console.log(fileObj);
		}
	});

	Session.set("editClip", myVid);
}
//Funktion um den Clip später einzusetzen

function insertClip(query){

	console.log(query);

	Clips.insert(query, function(err, doc){

		console.log(err);

		videos.update({_id: query.videoId}, {$push: {"clips": doc}});

		Meteor.users.update({_id: Meteor.userId()}, {$push: {"profile.clips": doc}});

		$( "#fastEditClip" ).slideUp( "slow", function() {
			hold = 0;
		    Session.set("recordingComplete", false);
		    Session.set("editClip", "");
		  });
	});

}