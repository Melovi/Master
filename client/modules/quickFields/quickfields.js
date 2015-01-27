Template.lovThis.events({
	"click .lovThis":function(event, template){

		addLov(event.currentTarget.id, this._id);

	}
})
	