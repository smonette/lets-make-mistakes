var express = require('express');
var app = require('express')();
var http = require('http').createServer(app);

// Include Soundcloud
var SC = require('node-soundcloud');

app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs');
 
// Initialize client
SC.init({
  id: '56fbb10a3e90facb024774a0708141fe',
  secret: 'b4a6c44e44e3f402a992e83418931ced',
  uri: 'http://www.mistakes.show/'
});

var user = '/users/57850026/tracks/';

// VIEWS
app.get('/', function(req,res){
  SC.get(user , function(err, tracks) {
    if ( err ) {
      console.log('well shit, soundcloud didnt load');
      res.render('pages/index', {shows: null });
    } else {
      // var allTracks = JSON.parse(track);
      res.render('pages/index', {shows: tracks });
    }
  });
});

app.get('/episode', function(req,res){
  res.redirect('/');
});

app.get('/episode/:id', function(req,res){   
  id = req.params.id;  
    
  SC.get(user + id, function(err, track) {   
    if ( err ) {    
      console.log('well shit, soundcloud didnt load');   
      singleTrack = null;    
      res.render('pages/404');   
    } else {    
      console.log('omfg it worked!:', track);   
      singleTrack = track;    
      res.render('pages/episode', {show: singleTrack});   
    }   
  });   
    
});
app.get('/*', function(req,res){  
  res.render('pages/404');
});

// START THE SERVER

http.listen(process.env.PORT || 3000, function(){
  console.log("local hosties");
});


