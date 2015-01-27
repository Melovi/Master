uploadDirectory = process.env.PWD;

Meteor.startup(function () {
  uploadDirectory = process.env.PWD;

  console.log(process.env.PWD);
  console.log(process.env.MONGO_URL);

});
