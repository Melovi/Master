Template.searchResults.helpers({
	showSearchResults:function(){

		return Session.get("showSearch");
	},
	searchResults:function(){

		results = Session.get("searchResults");

		//console.log(results)

		return results;
	}
});

Template.searchResults.events({

	'click a':function(){

		$("#desktopSearch").val("");
		Session.set("overlayHandler", "none")
	}
});