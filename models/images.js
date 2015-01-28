/*var imageStore = new FS.Store.GridFS("images", {
  mongoUrl: 'mongodb://127.0.0.1:3001/meteor', // optional, defaults to Meteor's local MongoDB
  //mongoUrl: "mongodb://Melovi:Musik_Erleben@ds051977.mongolab.com:51977/melovi_db",
  mongoOptions: {},  // optional, see note below
  //transformWrite: myTransformWriteFunction, //optional
  //transformRead: myTransformReadFunction, //optional
  maxTries: 5, // optional, default 5
  chunkSize: 1024*1024  // optional, default GridFS chunk size in bytes (can be overridden per file).
                        // Default: 2MB. Reasonable range: 512KB - 4MB
});*/

var myUploadDir = "~/Dokumente/Git/dev/popcorn_player";
var uploadDirectory;

UserImages = new FS.Collection("UserImages", {

  stores: [
    new FS.Store.FileSystem("UserImages", {path: myUploadDir + "/uploads/images"})

  ],
  filter: {
    allow: {
      contentTypes: ['image/jpeg', 'image/png']
    }
  }
});

