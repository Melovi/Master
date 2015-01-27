Template['login'].helpers({


	 
});

Template['login'].events({

    "click .loginButton": function(event, template){
        $('#loginPanel').stop().slideToggle("slow");
    },

        "click .joinButton": function(event, template){
    $('html, body').animate({
        scrollTop:$("#join").stop().offset().top
    },'slow');
    event.preventDefault();
    },

    "click #loginFacebookButton": function(event, template){
        event.preventDefault();
        Meteor.loginWithFacebook({ requestermissons: ['email']}, function (err) {
            if (err){
                return console.log(err);
            }
        });
        return false;
    },

    "click #loginGooglePlusButton": function(event, template){
        event.preventDefault();
        Meteor.loginWithGoogle();
        return false;
    },

    "click #loginTwitterButton": function(event, template){
        event.preventDefault();
        Meteor.loginWithTwitter();
        return false;
    },

	"click .logout": function(event, template){
       	event.preventDefault();
        Meteor.logout();
    },
	 'submit #formLogin': function(event, template){
    	event.preventDefault();
    	var emailVar = template.find('#login-email').value;
    	var passwordVar = template.find('#login-password').value;


        $('.ui.form')
          .form({
            email: {
              identifier  : 'email',
              rules: [
                {
                  type   : 'empty',
                  prompt : 'Please enter a gender'
                }
              ]
            },
            password: {
              identifier  : 'password',
              rules: [
                {
                  type   : 'empty',
                  prompt : 'Please enter your name'
                }
              ]
            },
          })
        ;
        //hier fehlt noch nen stop bei fehler und bei korrekten eingaben weiter:

    	Meteor.loginWithPassword(emailVar, passwordVar);
    	return false;
	}

});

