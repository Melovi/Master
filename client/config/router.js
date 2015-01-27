Router.configure({
  layoutTemplate: 'layout',
  notFoundTemplate: 'notFound',
  progessSpinner: false,
  waitOn:function(){  	

  	return [Meteor.subscribe("Playlists"), Meteor.subscribe("clipAndMeta")];
  	  	
  }
});