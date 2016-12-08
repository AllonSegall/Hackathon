
/*********include****************/

var express = require('express');
var request = require('request');
// var mongoose = require('mongoose');
var bodyParser = require('body-parser');

// mongoose.connect('mongodb://localhost/movies');

/**********Set Up****************/

var app = express();

app.use(express.static('public'));
app.use(express.static('node_modules'));

app.use(bodyParser.json());   // This is the type of body we're interested in
app.use(bodyParser.urlencoded({extended: false}));

// app.set('view engine', 'ejs');



/***************Vars*******************/

var key = "?api_key=ac5bfb1c99b5f392467f92b03c6d872b";

//test URL
var opt = 'https://api.themoviedb.org/3/movie/550';

var getGenreListUrl = "https://api.themoviedb.org/3/genre/movie/list"+ key + "&language=en-US";

//template for andy garcia:
var getActorByNameUrl = "https://api.themoviedb.org/3/search/person" + key + "&query="

var getMoviesByGenreUrl = "https://api.themoviedb.org/3/discover/movie" + key + "&with_genres=";

var getMoviesByActorIdUrl = "https://api.themoviedb.org/3/discover/movie" + key + "&with_cast=";


/*************API Functionality***************/

var data = {};
var requestDataFromApi = function(url){
  return request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body);
      data = body;

    }
  })
};


//test:
 // requestDataFromApi(getGenreListUrl);
 // requestDataFromApi(getActorByNameUrl);



/*******************Event Handlers*******************/

//Sending HTML bundle on first GET
app.get('/', function (req, res) {
  res.sendFile(__dirname + "/index.html");

});

//Send genre List from API to client on request
app.get('/genre', function (req, res) {

  request(getGenreListUrl, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body);
      res.send(body)
    }
  })
    
});
  

app.get('/moviesByGenre:genreId', function (req, res) {
  var genre = req.params.genreId;
  console.log(genre);
  request(getMoviesByGenreUrl + genre, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body);
      res.send(body)
    }
  })
});

app.get('/actor:actorName', function (req, res) {
  var actor = req.params.actorName;
  console.log(actor);
  request(getActorByNameUrl + actor, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body);
      res.send(body)
    }
  })
});


app.get('/moviesByActor:actorId', function (req, res) {
  var actor = req.params.actorId;
  console.log(actor);
  request(getMoviesByActorIdUrl + actor, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body);
      res.send(body)
    }
  })
});
 app.listen(8000);


