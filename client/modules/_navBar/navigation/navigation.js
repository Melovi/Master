Session.set("smallScreen", false);

// dropdown
Template.navigation.rendered = function(){
    $('.ui.dropdown').dropdown();
}

 Template['navigation'].helpers({
  navigationItems:function(){
    return navigationItems;
  },
  activeIfTemplateIs: function (template) {
    var currentRoute = Router.current();
    //console.log(currentRoute.lookupTemplate());
    return currentRoute &&
      template === currentRoute.lookupTemplate() ? 'active' : '';
  },
  smallScreen:function(){

    return Session.get("smallScreen");     
  }
});

  Template['navigation'].events({
  "click .loginButton": function(event, template){
        $('#loginPanel').stop().slideToggle("slow");
    },
    "click #settings": function(event, template){
    	//console.log("opening settings");

      $('.sidebar').sidebar('toggle');


    },
    'click .navItem, click .mobileNavItem':function(){

      if(Session.get("overlayHandler")){

        Session.set("overlayHandler", "none");
      }
    },
    'click #showLogin':function(){

      if(Session.get("overlayHandler") == "loginBar"){

       Session.set("overlayHandler", "none");

      } else {

       Session.set("overlayHandler", "loginBar");

      }

    },
    'click #navLogout':function(){

      Meteor.logout(function(){
        alert("Ausgeloggt");
        });
    }

});

