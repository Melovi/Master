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

	"click #loginBarFacebookButton": function(event, template){
        event.preventDefault();
        Meteor.loginWithFacebook({ requestermissons: ['email']}, function (err) {
            if (err){
                return console.log(err);
            }
        });
        return false;
    },

    "click #loginBarGooglePlusButton": function(event, template){
        event.preventDefault();
        Meteor.loginWithGoogle();
        return false;
    },

    "click #loginBarTwitterButton": function(event, template){
        event.preventDefault();
        Meteor.loginWithTwitter();
        return false;
    },
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

	    validation = clientValidation(username, email, password, passwordConfirm);

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
				          Console.log("Success! User Created!");
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

function clientValidation(username, email, password, confirmPassword){

	var validPassword;
	var validEmail;
	var validUsername;

	var emailMessage;
	var passwordMessage;
	var usernameMessage;

	var usernameRegex = /^[a-z0-9A-Z_\s]{3,15}$/
	var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


	//Check if Username is taken or too Short	
	if(username.length < 4){

		validUsername = false;
		usernameMessage = "Username zu kurz";
	} else if(username.lenghth > 15){

		validUsername = false;
		usernameMessage = "Username zu lang";

	} else if(Meteor.users.findOne({username: username})){

		validUsername = false;
		usernameMessage = "Username existiert bereits";

	} else if(!usernameRegex.test(username)){

		validUsername = false;
		usernameMessage = "*** nicht erlaubt";

	} else{

		validUsername = true;
		usernameMessage = "Username ist in Ordnung";
	}

	//Check the Email Address
	if(!emailRegex.test(email)){

		validEmail = false;
		emailMessage = "Die Email Adresse ist fehlerhaft";
	} else {

		validEmail = true;
		emailMessage = "Email Adresse ist in Ordnung";
	}

	//Check the Password
	if(password.length <= 6){

		validPassword = false;
		passwordMessage = "Das Passwort ist zu kurz";
	} else if(password != confirmPassword){

		console.log(password);
		console.log(confirmPassword);

		validPassword = false;
		passwordMessage = "Die Passwörter stimmen nicht überein";

	} else if(password == confirmPassword && password.length > 6){

		validPassword = true;
		passwordMessage = "Das Passwort ist in Ordnung";
	}

	return {username: {valid: validUsername, message: usernameMessage}, email: {valid: validEmail, message: emailMessage}, password:{valid: validPassword, message: passwordMessage}};


}