Template.settings.rendered = function(){
	$('.sidebar').sidebar({transition: "overlay"});
};

Template.settings.helpers({
	showSettings:function(){
      //console.log(Session.get("showSettings"));
      return Session.get("showSettings");
    },
    navigationItems:function(){
    	return settingsNavi;
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
	
	'click settingsProfileExtra':function(){

		/*Funktion für den kleinen Button hier einfügen */
		console.log("do something amazing");
	},
	"click .login":function(){

		if(Session.get("overlayHandler") == "loginBar"){

	       Session.set("overlayHandler", "none");
	       console.log("changing to none");

	      } else {
	      	console.log("changing to login");
	       Session.set("overlayHandler", "loginBar");

	      }
	},
	"click .logout":function(){

		Meteor.logout(function(){
        alert("Ausgeloggt");
      	});

	}
});

