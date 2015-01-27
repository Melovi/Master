var FavoriteNameMap = {
  "clip": Clips,
  "video": videos,
  "location": Locations,
  "interpret": Interprets,
  "userEvent": UserEvents,
  "playlist": Playlists
}

Meteor.methods({
  getCollectionValue:function(collection, key){
    var arr = [];

      collection.forEach(function(clip) {
          arr.push(clip[key]);
      });

      return arr;
  },
  updateLikes:function(collection, docId){

    check(collection, String);
    check(docId, String);    

    if(! FavoriteNameMap[collection]){

      throw new Meteor.Error(404, "No collection with that name")

    } else {                 

        if(FavoriteNameMap[collection].findOne({_id:docId, "lovs.users": this.userId})){         
          
          console.log("user found in " + collection + " .... removing"); 
          check(arguments, Match.Any);              

          FavoriteNameMap[collection].update({_id: docId}, {$pull: {"lovs.users": this.userId}, $inc:{"lovs.count": -1}},function(err){
            if(err){
              console.log(err);
            } else {
              console.log("succes");
            }
          });

        } else {          

          console.log("user not found in " + collection + " .... adding");
          check(arguments, Match.Any);
          
          FavoriteNameMap[collection].update({_id: docId}, {$push: {"lovs.users": this.userId}, $inc: {"lovs.count": 1}}, function(err){
            if(err){
              console.log(err);
            } else {
              console.log("success");
            }
          })
        }
        
      }  

    },
    downloadUrl:function(url){

      console.log("doin smth at dlurl");
      VideoClips.insert(url, function(err, fileObj){

        console.log(err, fileObj);
      });
    }
})