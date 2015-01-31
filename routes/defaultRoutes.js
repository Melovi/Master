var IR_BeforHooks = {
  isLoggedIn: function(){
    if(!(Meteor.loggingIn() || Meteor.user())){
      Session.set("overlayHandler", "loginBar");
      this.next();
    } else {
      this.next();
    }
  }
}

//-------------------------------------------------------------
//Routes for CMS Purposes:
//------------------------------------------------------------
Router.route('addLocation', {
  path:'addLocation'
});

Router.route('addGenre', {
  path:'addGenre'
});

Router.route('setLocation', {
  path: 'setLocation'
});

Router.route('addInterpret',{
  path:'addInterpret',
  waitOn:function(){
    return [Meteor.subscribe("Locations"), Meteor.subscribe("Genres")];
  }
});

//-----------------------------------------------------------
//Routes for Editing Purposes
//------------------------------------------------------------
//Add an Event
Router.route('addEvent', {
  path:'addEvent',
  onBeforeAction: IR_BeforHooks.isLoggedIn,
  waitOn:function(){
    return [Meteor.subscribe("Locations"), Meteor.subscribe("Genres"), Meteor.subscribe("userProfiles")]
  }
});

Router.route('editProfile', {
  path:'editprofile',
  onBeforeAction: IR_BeforHooks.isLoggedIn,
  waitOn:function(){
    return Meteor.subscribe("UserImages");
  }

});

Router.route('addVideo',{
  onBeforeAction: IR_BeforHooks.isLoggedIn
});

//-------------------------------------------------------------
//Main Navigation Pages: 
//-------------------------------------------------------------
// Home Route
Router.route('home', {
  path:'home',
  data: function(){
    return {navi: settingsNavi}
  }
});

Router.route("landingpage", {
  path: "/",
  layoutTemplate: "landingpage",
  onBeforeAction: function(){
    if(!Meteor.user()){
      if(Meteor.loggingIn()){
        this.next();
      } else{        
        this.next();
      }                  
    } else {

      Router.go("home");
      this.next();
    }
  },
  progess: false
})

// Videos Route
Router.route('videos', {
  path: 'videos',
  waitOn: function(){
    return Meteor.subscribe("Videos");
  }
});

// Discover Route
Router.route('discover', {
  path:'discover',
  waitOn: function(){
    return Meteor.subscribe("discover", Session.get("currentLocation"));
  }
});

//Recordings Route
Router.route('recordings', {
  path: 'recordings',
  waitOn: function(){
    return [Meteor.subscribe("Clips"), Meteor.subscribe("Videos"), Meteor.subscribe("VideoClips")];
  }
});

//  Favorites Route
Router.route('favorites', {
  path: 'favorites',
  onBeforeAction: IR_BeforHooks.isLoggedIn,
  waitOn: function(){
    return Meteor.subscribe("Playlists");
  }
})

// Events Route
Router.route('events', {
  path:'events',
  waitOn:function(){
    return [Meteor.subscribe("UserEvents"), Meteor.subscribe("userProfiles")];
  }
});



//-------------------------------------------------------------
//Sub Navigation Pages
//-------------------------------------------------------------
// Impressum Route
Router.route('impressum', {
  path:'impressum'
});

// Impressum Route
Router.route('aboutUs', {
  path:'aboutus'
});

// Impressum Route
Router.route('globalSettings', {
  path:'settings'
});

//-------------------------------------------------------------
// Single Pages with Variables
//-------------------------------------------------------------
Router.route('locations', {
  path: 'location/:name',
  waitOn:function(){
    return Meteor.subscribe("Locations");
  },
  data: function(){
    return {locations: Locations.findOne({name:this.params.name})};
  }
});

Router.route('interprets', {
  path: 'interpret/:name',
  waitOn:function(){
    return Meteor.subscribe("Interprets");
  },
  notFoundTemplate: 'notFound',
  data: function(){

    var name = this.params.name;
    var correctedLink = name.replace("_", " ");

    return {interpret: Interprets.findOne({name:correctedLink})}
  }
})

Router.route('singleVideo', {
  path: 'videos/:id',
  onBeforeAction:function(){
    videos.update({_id: this.params.id}, {$inc: {views: 1}}, function(err){
      if(err){
        console.log(err);
      } else {
        console.log("increased");
      }
    });
    this.next();
  },
  waitOn: function(){
    return [Meteor.subscribe("Videos"), Meteor.subscribe("VideoClips"), Meteor.subscribe("Clips")];
  },
  data: function(){
    return {video: videos.findOne({_id:this.params.id})};
  }
});

Router.route('eventDetail',{
  path: 'event/:id',
  waitOn: function(){
    return [Meteor.subscribe("UserEvents"), Meteor.subscribe("userProfiles")];
  },
  data: function(){
    return {userEvent: UserEvents.findOne({_id: this.params.id})};
  }
})

Router.route('playlistDetails', {
  path:'playlist/:_id'
});



//-----------------------------------------------------
// Deprecated Routes
//-----------------------------------------------------
Router.route('timeline', {
  path: 'videoplayer/:id',
  waitOn: function() {
    return Meteor.subscribe('vidsAndClips', parseInt(this.params.id));
  },
  data: function(){
    console.log("The Parameter of id is " + this.params.id);
    return clips.find({},{sort:{start:1}});
  }
});

