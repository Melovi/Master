Template.landingpage.events({

	"click .navLogin":function(){

		$("#topLogin").show();
		Session.set("loginOrRegister", "login");
	},
	"click .navRegister":function(){

		$("#topLogin").show();
		Session.set("loginOrRegister", "register");
	},
	"click .siteLogin":function(){

		$("#beforeLog").hide("slow", function(){

			$("#afterLog").show("slow");

		})
		
	},
	"click .siteRegister":function(){

		$("#beforeLog").hide("slow", function(){

			$("#afterReg").show("slow");

		});
	},
	"click .login":function(event, template){

		var user = template.find("#username").value;
		var password = template.find("#password").value;

		Meteor.loginWithPassword(user, password, function(err){
			if(err){
				console.log(err);
			}
			else {
				alert("erfolgreich eingeloggt");
				Router.go("home");
			}
		})

	},
	"click .back":function(){

		$("#afterLog").hide("slow", function(){

			$("#beforeLog").show("slow");

		});

		$("#afterReg").hide("slow", function(){

			$("#beforeLog").show("slow");

		});
	},
	"click .register":function(event, template){

		var username = template.find("#regUsername").value;
	    var email = template.find("#regEmail").value;
	    var password = template.find("#regPassword").value;
	    var passwordConfirm = template.find("#regPasswordConfirm").value;

	    validation = clientRegisterValidation(username, email, password, passwordConfirm);

	    console.log(validation);

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
				          alert("Registriert");
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
})