Session.set("newVideo", {});
Session.set("activeTab", 1);
Session.set("fileComplete", false);
Session.set("metaComplete", false);
Session.set("invalidInput", false);
var vForm = "insertVideoForm";
var idArr = ["source", "title", "subtitle", "location", "description", "genre", "bpm", "tags" ];

Template.addVideo.rendered = function(){

	$(".ui.dropdown").dropdown()
};


Template.addVideo.helpers({	

	activeIfTabIs:function(value){

		return Session.get("activeTab") == value ? "active" : "";
	},
	completedIfFormIsDone:function(formName){

		return Session.get(formName) ? "completed" : "";
	},
	hiddenIfTabIsNot:function(value){

		return Session.get("activeTab") == value ? "" : "hidden";
	},
	invalidInput:function(){

		return Session.get("invalidInput");
	},
	inputsToCheck:function(){
		
		return idArr.map(function(c){
			return {fieldName: c}
		});
	},
	locations:function(){

		var locations = Locations.find();

		return locations;
	},
	genreOptions:function(){

		var genres = Genres.find().fetch();

		allOptions = setOptionFields(genres, "subgenres");

		return allOptions;
		
	},
	videos:function(){

		return Session.get("newVideo");
	}

});

Template.addVideo.events({

	'click .step':function(event, template){

		checkFormStatus(event, template);

		Session.set("activeTab", event.currentTarget.id);
	},

	'change .myFileInput': function(event, template) {
  
	 	console.log("mauahahah geht noch nicht");
	},
	'change #songSource':function(){

		AutoForm.validateField("insertVideoForm", "source") ? Session.set("fileComplete", true) :  Session.set("fileComplete", false);
	},
	'click .next':function(event, template){

		//Funktionen für den ersten Button
		if(event.currentTarget.id == "newFile"){

			sourceValid = AutoForm.validateField("insertVideoForm", "source")

			if(sourceValid){

				Session.set("fileComplete", true);				
				nextTab();
			} else {

				Session.set("invalidInput", true);
			}
			
		} 
		//Funktion für den zweiten Button
		else if(event.currentTarget.id = "newMeta"){

			checkFormStatus(event, template);

			if(Session.get("metaComplete")){

				nextTab();
			}
		}
		
	},
	'click #videoSubmit':function(event, template){

		checkFormStatus(event, template);

		if(Session.get("fileComplete") && Session.get("metaComplete")){

			console.log("inserting video");

			var newVid = Session.get("newVideo");

			console.log(newVid);
			videos.insert(newVid, function(err, doc){

				if(err){
					console.log(err);
					alert("Irgendwas ist schief gelaufen");
				} else {

					alert("Das Video ist eingefügt worden");
					Router.go("/videos/" + doc);
				}
			})
		}
	}
});


function checkFormStatus(event, template){

	validator = validateAllFields(vForm, idArr);	

	if(validator){

		Session.set("metaComplete", true);
		fileInfo = Session.get("newVideo");
		fileInfo.source = template.find("#songSource").value;
		fileInfo.interpret = Meteor.user().username;
		fileInfo.user = Meteor.userId();
		fileInfo.title = template.find("#songTitle").value;
		fileInfo.subtitle = template.find("#songSubtitle").value;
		fileInfo.genre = [template.find("#songGenre").value];
		fileInfo.location = template.find("#songLocation").value;
		fileInfo.description = template.find("#songDescription").value;
		fileInfo.bpm = template.find("#songBpm").value;
		//fileInfo.tags = template.find("#songTags").value;

		Session.set("newVideo", fileInfo);

	} else {

		Session.set("metaComplete", false);
		
	} 

}

//Validates all Fields of a Form, and if one is false
//returns the value false;
function validateAllFields(form, idArr){

	var bool = true;
	console.log(idArr);

	idArr.forEach(function(value){

		check = AutoForm.validateField(form, value);

		if(!check){

			bool = false;

		}
	});

	Session.set("invalidInput", !bool);
	return bool;
}

function resetSession(){

	Session.set("activeTab", 1);
	Session.set("newVideo", {});
	Session.set("metaComplete", false);
	Session.set("fileComplete", false);
}

function nextTab(){
	console.log("doin smth");
	Session.get("activeTab") == 1 ? Session.set("activeTab", 2) : Session.set("activeTab", 3)
}