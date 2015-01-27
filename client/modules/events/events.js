Session.set("eventLimit", 4);

Template.eventDetail.rendered = function(){

	$(".ui.dropdown").dropdown();
	
}

Template.eventLoader.helpers({
	prevUserEvents:function(){

		var currentDate = new Date();
		var userEvents = UserEvents.find({date: {$lt: currentDate}}, {limit: 2});
		
		return userEvents;
	},
	nextUserEvents:function(){

		var currentDate = new Date();
		var userEvents = UserEvents.find({date: {$gt: currentDate}}, {limit: Session.get("eventLimit")});
		
		return userEvents;
	}
})

Template.eventLoader.events({
	"click .header":function(){

		console.log(this._id);
		Router.go("/event/"+ this._id);
	},
	"click .moreEvents":function(){

		var moreEvents = Session.get("eventLimit");
		moreEvents += 4;

		Session.set("eventLimit", moreEvents);
	},
	"click .participate":function(event, template){

		addEvent(this._id);
	}
})