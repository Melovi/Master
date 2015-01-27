Template.overlayHandler.helpers({
	overlay:function(){

		var currentOverlay = Session.get("overlayHandler");

		return currentOverlay;

	},
	searchResults:function(){

		return Session.get("overlayHandler") == "searchResults" ? true : false;
	},
	loginBar:function(){

		return Session.get("overlayHandler") == "loginBar"? true : false;
	},
	playlist:function(){

		return Session.get("overlayHandler") == "playlist"? true : false;
	},
	locationPrompt:function(){

		return Session.get("overlayHandler") == "locationPrompt"? true : false;
	}

})

