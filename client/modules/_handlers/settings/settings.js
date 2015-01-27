Template.settings.rendered = function(){
	$('.sidebar').sidebar({transition: "overlay"});
};

Template.settings.helpers({
	showSettings:function(){
      //console.log(Session.get("showSettings"));
      return Session.get("showSettings");
    },
    navigationItems:function(){
    	return navigationItems;
    },
    subNavigationItems:function(){
    	return subNavigationItems;
    },
    mailAddress:function(index){

    	var user = Meteor.user();
    	var mails = user.emails;
    	var defaultMail = 0;

    	console.log(mails);

    	currentmail = mails[defaultMail].address;

    	return currentmail;
    },
    activeSearch:function(){
    	var results = Session.get("searchResults");    	

    	if(results.songs){

    		return results;

    	} else {

    		return false;
    	}
    }
});

Template.settings.events({
	'click .overlay, click a':function(event, template){

		Session.set("overlayHandler", "none");
	},
	'click settingsProfileExtra':function(){

		/*Funktion für den kleinen Button hier einfügen */
		console.log("do something amazing");
	}
});


var navigationItems = [
	{
		label: "Profil Einstellen",
		icon: "edit",
		path: "editProfile",
		activeTemplate: "EditProfile"
	},
	{
		label: "Video hinzufügen",
		icon:"plus",
		activeTemplate: "AddVideo",
		path: "addVideo"
	},
	{
		label: "Event hinzufügen",
		icon: "cocktail",
		activeTemplate: "AddEvent",
		path: "addEvent"
	},
	{
		label: "Ort einstellen" ,
		icon:"marker",
		path: "setLocation",
		activeTemplate: "SetLocation"
	},  
	{
		label: "Add Location",
		icon:"location arrow",
		path: "addLocation",
		activeTemplate: "AddLocation"
	},
	{
		label: "Genre hinzufügen",
		icon:"",
		path: "addGenre",
		activeTemplate: "AddGenre"
	},
	{
		label: "Bandprofil erstellen",
		icon: "music",
		path: "addInterpret",
		activeTemplate: "AddInterpret"
	}

];

var subNavigationItems = [
	{
		label: "Impressum",		
		path: "impressum"
	},
	{
		label: "Über Uns",
		path: "aboutUs"
	},
	{
		label: "Globale Einstellungen",		
		path: "globalSettings"
	},
	

];