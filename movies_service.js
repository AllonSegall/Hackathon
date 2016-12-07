var dummyData  = [
    {id: 0, title: "The Godfather", overview: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.", year: 1972, img:"https://images-na.ssl-images-amazon.com/images/M/MV5BNTUxOTdjMDMtMWY1MC00MjkxLTgxYTMtYTM1MjU5ZTJlNTZjXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SY1000_CR0,0,706,1000_AL_.jpg", genre: "drama"},
    {id: 1, title: "Pulp Fiction", overview: "The lives of two mob hit men, a boxer, a gangster's wife, and a pair of diner bandits intertwine in four tales of violence and redemption.", year: 1994, img: "https://images-na.ssl-images-amazon.com/images/M/MV5BMTkxMTA5OTAzMl5BMl5BanBnXkFtZTgwNjA5MDc3NjE@._V1_SY1000_CR0,0,673,1000_AL_.jpg" , genre: 'action'},
    {id: 2, title: "Snatch", overview: "Unscrupulous boxing promoters, violent bookmakers, a Russian gangster, incompetent amateur robbers, and supposedly Jewish jewelers fight to track down a priceless stolen diamond.", year: 2002, img: "https://images-na.ssl-images-amazon.com/images/M/MV5BMTA2NDYxOGYtYjU1Mi00Y2QzLTgxMTQtMWI1MGI0ZGQ5MmU4XkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_SY1000_SX684_AL_.jpg", genre: "romance"},
    {id: 3, title: "Fight Club", overview: "An insomniac office worker, looking for a way to change his life, crosses paths with a devil-may-care soap maker, forming an underground fight club that evolves into something much, much more.", year: 1999, img: "https://images-na.ssl-images-amazon.com/images/M/MV5BNGM2NjQxZTAtMmU5My00YTk5LWFmOWMtYjZlYzk4YzMwNjFlXkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_SY1000_CR0,0,666,1000_AL_.jpg", genre: "comedy"},
    {id: 4, title: "Rounders", overview: "A young man is a reformed gambler who must return to playing big stakes poker to help a friend pay off loan sharks.", year: 1998, img: "https://images-na.ssl-images-amazon.com/images/M/MV5BMTc4OTcxNDY2Nl5BMl5BanBnXkFtZTgwNDg0MzkxMDE@._V1_.jpg", genre: "drama" },
    {id: 5, title: "Inside Out", overview: "After young Riley is uprooted from her Midwest life and moved to San Francisco, her emotions - Joy, Fear, Anger, Disgust and Sadness - conflict on how best to navigate a new city, house, and school.", year: 2015, img: "https://images-na.ssl-images-amazon.com/images/M/MV5BOTgxMDQwMDk0OF5BMl5BanBnXkFtZTgwNjU5OTg2NDE@._V1_SY1000_CR0,0,674,1000_AL_.jpg", genre: "action"}
  ];

  var dummyGenre = [
    {label: 'Select Genre', id: 0},
    {label: 'Drama', id: 1},
    {label: 'Action', id: 2},
    {label: 'Comedy', id: 3},
    {label: 'ChickFlick', id: 4}
    ];

    var dummyPG = [
      {label: "Select PG Rating", id: 0},
      {label: "PG", id: 1},
      {label: "PG-13", id: 2},
      {label: "R", id: 3},
      {label: "CD-17", id: 4}
    ];

/*******************movies main service*********************/
/*handle main client logic and comunicates with the server**/
/***********************************************************/


app.factory('moviesService', ['$http', function ($http) {

  var movies = {
    moviesOptions: [],
    moviesPull: [],
    actors: [],
    genre: [],
    pg:[]

  }

  movies.genre = dummyGenre;
  movies.pg = dummyPG;

  movies.getRandMovie = function(){
    if(movies.moviesPull.length > 0){
      var movieIndex = Math.floor((Math.random() * (movies.moviesPull.length-1)));
      var temp = movies.moviesPull[movieIndex];
      movies.moviesPull.splice(movieIndex, 1);
      return temp;
    }else{
      false;
    }
  };

  // movies.removeMovieFromPull = function(movie){
  //   if(movies.moviesPull.length > 0){
  //     for(m in movies.moviesPull){
  //       if(movie == movies.moviesPull[m])
  //       {
  //         movies.moviesPull.splice(m, 1);
  //         return movies.moviesPull.length;
  //       }
  //     }
  //   }else{
  //     //handle later
  //   }

  // };

  //just for testing
  movies.getMoviesFromDummy = function(){
    movies.moviesPull = dummyData;
  };



  /*************server shit***************/


  movies.getMoviesByActorFromServer = function (actor) {
     $http.get('moviesServer').success(function (data) {
      console.log(data)

      angular.copy(data, movies.moviesPull);
    });
  };

  movies.getMoviesByGenreFromServer = function (genre) {
     $http.get('moviesServer/').success(function (data) {
      console.log(data)

      angular.copy(data, movies.moviesPull);
    });
  };

  movies.getMoviesByPGFromServer = function (pg) {
     $http.get('moviesServer').success(function (data) {
      console.log(data)

      angular.copy(data, movies.moviesPull);
    });
  };



  return movies;

}]);
