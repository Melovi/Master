uploadDirectory = process.env.PWD;

Meteor.startup(function () {
  uploadDirectory = process.env.PWD;

  console.log(process.env.PWD);
  console.log(process.env.MONGO_URL);

  
  setUpForeignAccounts();


});


function setUpForeignAccounts(){

	Accounts.loginServiceConfiguration.remove({
		service:"facebook"
	});

	Accounts.loginServiceConfiguration.insert({
		service: "facebook",
		appId: "1476925185865667",
		secret: "63c9690f26663e2d5e878af14e446031"
	});

	Accounts.loginServiceConfiguration.remove({
		service:"twitter"
	});

	Accounts.loginServiceConfiguration.insert({
		service: "twitter",
		consumerKey: "EdB8q4kXqyQFFdVTe8doMCP2s",
		secret: "NJsBvCfrlyhIrIAt8RZ5I9UcXIceV3bKwBDXbS8piNUrXZT4AX"
	});

	Accounts.loginServiceConfiguration.remove({
		service:"google"
	});

	Accounts.loginServiceConfiguration.insert({
		service: "google",
		clientId: "409805913537-hsp8pbr67qcp07053o4rcrt88jdlhp27.apps.googleusercontent.com",
		secret: "sMNcAqK58zF8C-Bcy-ryk6vu"
	});
}