

Template['record'].events({

    "click .recordButton": function(event, template){
          videoCapture();
          //captureVideo();
    }, 

'change .myFileInput': function(event, template) {
  

  //klassik handmade upload
    var ft = new FileTransfer();
    var options = new FileUploadOptions();
    options.fileKey="image";
    options.params={};
    options.fileName =  "test";
    options.params.fileName = options.fileName ;
    options.chunkedMode = true;
    fileURI = mediaFile.fullPath;
    uploadUrl = "http://141.82.172.188:3000";
    ft.upload(fileURI, uploadUrl, successFn, captureError, options, true); // traue jedem Host ( nicht! *muhahahaa* )


  }

});


// --------------- Cordova beispiel


 // Called when capture operation is finished
    //
    function captureSuccess2(mediaFiles) {
      console.log("erfolgreich Video(s) aufgenommen.");
        var i, len;
        for (i = 0, len = mediaFiles.length; i < len; i += 1) {
            uploadFile(mediaFiles[i]);
        }
    }

    // Called if something bad happens.
    //
    function captureError(error) {
        var msg = 'An error occurred during capture: ' + error.code;
        navigator.notification.alert(msg, null, 'Uh oh!');
    }

    // A button will call this function
    //
    function captureVideo() {
        // Launch device video recording application,
        // allowing user to capture up to 3 seconds
        navigator.device.capture.captureVideo(captureSuccess2, captureError, {limit: 1, duration: 3});
    }

    // Upload files to server
    function uploadFile(mediaFile) {
      console.log("es wird ein Video hochgeladen");
      var dateiGrosse = mediaFile.size/1048576;
      console.log("Die Datei ist "+dateiGrosse.toFixed(2)+" mb groß");

      var uri = encodeURI("http://melovi.de/php/upload.php");

      var options = new FileUploadOptions();
      options.fileKey="files";
      options.fileName= mediaFile.name;
      options.mimeType="video/mp4";
      options.chunkedMode = true;


        var ft = new FileTransfer(),
            path = mediaFile.fullPath,
            name = mediaFile.name;

     /*   ft.onprogress = function(progressEvent) {
          if (progressEvent.lengthComputable) {
            loadingStatus.setPercentage(progressEvent.loaded / progressEvent.total);
          } else {
            loadingStatus.increment();
          }
        };*/

        ft.upload(path, uri, successFn2, errorFN2, options);



     function successFn2(result) {
                var bytesGesendet = result.bytesSent/1048576;
                console.log( bytesGesendet.toFixed(2) + ' mb gesendet');
                var objUrl = JSON.parse(result.response);
                console.log("Teste mal json: "+objUrl.files[0].url);
     }

     function errorFN2(error) {
                console.log('Error uploading file ' + path + ': ' + error.code);
     }
  }

// --------------- Cordova Beispiel Ende



function videoCapture() {
  window.plugins.videocaptureplus.captureVideo(
      captureSuccess2,
      captureError,
      {
        limit: 1,
        duration: 5,
        highquality: true,  
        frontcamera: true, 
        // you'll want to sniff the useragent/device and pass the best overlay based on that.. assuming iphone here
        portraitOverlay: 'www/img/cameraoverlays/overlay-iPhone-portrait.png',
        landscapeOverlay: 'www/img/cameraoverlays/overlay-iPhone-landscape.png'
      }
  );
}

function captureSuccess(mediaFiles) {

  //klassik handmade upload
    var ft = new FileTransfer();
    var options = new FileUploadOptions();
    options.fileKey="document";
    options.params={};
    options.fileName =  fileName;
    options.params.fileName = options.fileName ;
    options.chunkedMode = true;
    fileURI = mediaFile.fullPath;
    uploadUrl = "http://localhost:3000";
    ft.upload(fileURI, uploadUrl, successFn, captureError, options, true); // traue jedem Host ( nicht! *muhahahaa* )

//Das gehört zu dem allmächtigen fscollection werkezug, speichert sogar brav lokal ab, aber eben nichts anderes.
   /* FS.Utility.eachFile(event, function(file) {
      Images.insert(file, function (err, fileObj) {
        console.log("ist das jetzt ein Fehler oder eine gute Nachricht? "+err);
      });
    });*/

  // Das ist vsivsi:file-collection
  var func = this;
   var file = mediaFiles[0];
   var reader = new FileReader();
   reader.onload = function(fileLoadEvent) {
      Meteor.call('file-upload', file, reader.result);
   };
   reader.readAsDataURL(file);
    
 
   // siehe function weiter unten
  //Meteor.saveFile(mediaFiles);

  // altes Beispiel hat die Videos nur auf dem gerät abgespeichert und danach ein Video Player Div angelegt:
  /*var i, len;
  for (i = 0, len = mediaFiles.length; i < len; i++) {
    var mediaFile = mediaFiles[i];
    mediaFile.getFormatData(getFormatDataSuccess, getFormatDataError);

    var vid = document.createElement('video');
    vid.id = "theVideo";
    vid.width = "240";
    vid.height = "160";
    vid.controls = "controls";
    var source_vid = document.createElement('source');
    source_vid.id = "theSource";
    source_vid.src = mediaFile.fullPath;
    vid.appendChild(source_vid);
    document.getElementById('video_container').innerHTML = '';
    document.getElementById('video_container').appendChild(vid);
    document.getElementById('video_meta_container2').innerHTML = parseInt(mediaFile.size / 1000) + 'KB ' + mediaFile.type;
  }*/
}

function successFn(uploadUrl){
  console.log("Die Datei wurde erfolgreich übertragen. URL: "+uploadUrl)
}

function getFormatDataSuccess(mediaFileData) {
  document.getElementById('video_meta_container').innerHTML = mediaFileData.duration + ' seconds, ' + mediaFileData.width + ' x ' + mediaFileData.height;
}

function captureError(error) {
  // code 3 = cancel by user
  alert('Returncode: ' + JSON.stringify(error.code));
}

function uploadError(error) {
  // code 3 = cancel by user
  alert('Uploaderror: ' + JSON.stringify(error.code));
}

function getFormatDataError(error) {
  alert('A Format Data Error occurred during getFormatData: ' + error.code);
}

 // Upload files to server
    Meteor.saveFile = function(mediaFiles) {
        console.log("Was steht eigentlich in mediaFiles? "+mediaFile.fullPath);
       var mediaFile = mediaFiles[0];
      mediaFile.getFormatData(getFormatDataSuccess, getFormatDataError);
      console.log("Was will denn meteor save alles? ");

  var encoding, fileReader, method, type, blob;
  fileReader = new FileReader();
  method = void 0;
  encoding = "binary";
  type = mediaFile.type;
  console.log("type: "+type);
  fileReader.onload = function(mediaFile) {
    console.log("also der will jetzt speichern. "+"name: " +name +"path: " +path +"encoding: " +encoding);
    return Meteor.call("saveFile", file.srcElement.result, name, path, encoding, function(err, res) {
      return console.log(err, res);
    });
  };
  return fileReader[method](blob);
};


