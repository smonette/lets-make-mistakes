var express = require('express');
var app = require('express')();
var http = require('http').createServer(app);

// Include Soundcloud
var SC = require('node-soundcloud');

app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs');
 
// Initialize client
SC.init({
  id: '6e7d6bb6fab87f38f69a857e4544b21d',
  secret: '18a1dca02b5e86e2058fb93c7a4949eb',
  uri: 'http://www.muleradio.net/callback'
});


SC.get('/users/57850026/tracks', function(err, track) {
  if ( err ) {
    console.log('well shit, soundcloud didnt load');
  } else {
    console.log('omfg it worked!:', track);
    // var allTracks = JSON.parse(track);
    allTracks = track;
  }
});

// VIEWS
app.get('/', function(req,res){
  res.render('pages/index', {shows: allTracks});
});

// app.get('/episode/:id', function(req,res){
//   id = req.params.id;

//   SC.get('/tracks/'+ id, function(err, track) {
//     if ( err ) {
//       console.log('well shit, soundcloud didnt load');
//     } else {
//       console.log('omfg it worked!:', track);
//       // var allTracks = JSON.parse(track);
//       singleTrack = track;
//     }
//   });

//   res.render('pages/episode', {show: singleTrack});
// });

// START THE SERVER

http.listen(process.env.PORT || 3000, function(){
  console.log("local hosties");
});


