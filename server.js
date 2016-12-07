
/*********include****************/

var express = require('express');
var request = require('request');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/movies');

/**********Set Up****************/

var app = express();

app.use(express.static('public'));
app.use(express.static('node_modules'));

app.use(bodyParser.json());   // This is the type of body we're interested in
app.use(bodyParser.urlencoded({extended: false}));

// app.set('view engine', 'ejs');



/***************Vars*******************/
//test URL
var opt = 'https://api.themoviedb.org/3/movie/550?api_key=ac5bfb1c99b5f392467f92b03c6d872b';

var getGenreListUrl = "https://api.themoviedb.org/3/genre/movie/list?api_key=ac5bfb1c99b5f392467f92b03c6d872b&language=en-US"

//template for andy garcia:
var getActorByNameUrl = "https://api.themoviedb.org/3/search/person?api_key=ac5bfb1c99b5f392467f92b03c6d872b&query=andy%20garcia"



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
  

// app.get('/movies:genre', function (req, res) {
//   var genre = req.params.genre;
//   request(, function (error, response, body) {
//     if (!error && response.statusCode == 200) {
//       console.log(body);
//       res.send(body)
//     }
//   })
// });


 app.listen(8000);


