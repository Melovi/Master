Session.set("loginOrRegister", "login");

Template.loginBar.helpers({
	loginOrRegister:function(){

		if(Session.get("loginOrRegister") == "login"){

			return true
		}
		else if(Session.get("loginOrRegister") == "register"){
			return false;
		}
	},
	loginActive:function(){

		Session.get("overlayHandler") == "loginBar" ? "active" : "hidden";
	}

})

Template.loginBar.events({

	
    "click #loginBarRegister":function(event, template){

    	event.preventDefault();
    	Session.set("loginOrRegister", "register")
    },  
	'click #registerButton': function(evt, tpl){ 
		Session.set('currentTemplate', 'registration');
	},
	'submit #loginBarForm':function(event, template){

		event.preventDefault();

		email = template.find("#loginBarEmail").value;
		password = template.find("#loginBarPassword").value;

		Meteor.loginWithPassword(email, password, function(err){

			if(err){

				console.log(err);

			} else {

				alert("Erfolgreich eingeloggt!")
				Session.set("overlayHandler", "none");

			}
		});
	},
	  'submit #registerBarForm':function(event, template){

	    event.preventDefault();

	    var username = template.find("#registerBarUsername").value;
	    var email = template.find("#registerBarEmail").value;
	    var password = template.find("#registerBarPassword").value;
	    var passwordConfirm = template.find("#registerBarPasswordConfirm").value;

	    validation = clientRegisterValidation(username, email, password, passwordConfirm);

	    if(validation.email.valid){

	    	if(validation.username.valid){

	    		if(validation.password.valid){

		    		console.log(validation.password.message);
		    		console.log("Setting up user");
		    		query = {};
		    		query.username = username;
		    		query.email = email;
		    		query.password = password;

		    		console.log(query);

		    		 Accounts.createUser({username: username, email: email, password: password}, function(err){
				        if(err){
				          console.log(err);
				        }
				        else{
				          Session.set("overlayHandler", "none");
				          Router.go("editProfile");
				          console.log("Success! User Created!");
				        }

				      });

		    	} else {

		    		console.log(validation.password.message);
				}

	    	} else {

	    		console.log(validation.username.message);
	    	}	    	

	    } else {

	    	console.log(validation.email.message);
	    }
	}
});


Template.socialButtons.events({
		"click .facebookButton": function(event, template){
	        event.preventDefault();
	        Meteor.loginWithFacebook({ requestPermissons: ['email']}, function (err) {
	            if (err){
	                return console.log(err);
	            } else {
	            	alert("Mit facebook eingeloggt")
	            }
	        });
	      
	    },

	    "click .googlePlusButton": function(event, template){
	        event.preventDefault();
	        Meteor.loginWithGoogle({ requestPermissions: ["email"]}, function(err){

	        	if(err){
	        		return console.log(err);
	        	} else {
	            	alert("Mit Google+ eingeloggt")
	            }
	        });

	    },

	    "click .twitterButton": function(event, template){
	        event.preventDefault();
	        Meteor.loginWithTwitter(function(err){

	        	if(err){
	        		return console.log(err);
	        	} else {
	            	alert("Mit Twitter eingeloggt")
	            }
	        });

	    }
})