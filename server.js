var express = require('express');

var app = express();

var http = require('http');

var options = {
	host: 'www.google.com',
	path: '/index.html'
};

var req = http.get(options, function(res) {
  console.log('STATUS: ' + res.statusCode);
  console.log('HEADERS: ' + JSON.stringify(res.headers));

  // Buffer the body entirely for processing as a whole.
  var bodyChunks = [];
  res.on('data', function(chunk) {
    // You can process streamed parts here...
    bodyChunks.push(chunk);
  }).on('end', function() {
    var body = Buffer.concat(bodyChunks);
    console.log('BODY: ' + body);
    // ...and/or process the entire body here.
  })
});

req.on('error', function(e) {
  console.log('ERROR: ' + e.message);
});




app.listen(8000);
/*
var api ="https://api.themoviedb.org/3/discover/movie?api_key=51709f2e74017c9f066e0946cb8568e3&with_genres=28&with_cast=500&sort_by=popularity.desc"


http.get("https://api.themoviedb.org/3/discover/movie?api_key=51709f2e74017c9f066e0946cb8568e3&with_genres=28&with_cast=500&sort_by=popularity.desc", function(req, res){
console.log(api)
res.send(api)
});
*/
//https://api.themoviedb.org/3/discover/movie?api_key=51709f2e74017c9f066e0946cb8568e3&with_genres=28&with_cast=500&sort_by=popularity.desc
