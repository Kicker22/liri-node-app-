require("dotenv").config();
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var axios = require("axios");
var moment = require("moment");
var fse = require("fs-extra");
var pick = require("object.pick");


// Functions
// ===================================================================================



// i couldnt get artist names to pull on my own so i borowed this helper function. and im honestly
// not sure why it works...but it works so it stays...
var getArtistNames = function (artist) {
  return artist.name;
};


// these are my spotify keys
var spotify = new Spotify(keys.spotify)

// This function is specifically for pulling information from the spotify API
// it has a paramater called songName that gets assignd a value when the user inputs into the command line.
var getSpoty = function (songName) {
  songName = (process.argv.slice(3).join(" "));
  if (songName === undefined) {
    songName = "Everybody wants to rule the world"
  };
  //  this function searches the spotify api for songs
  // I have it set to a limit of one for now
  spotify.search({ type: 'track', query: songName, limit: 1 }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    };

    // shorthand variable to cut down on typing.
    var songs = data.tracks.items;
    // for loop to iterate throught to object arrays anb grab the appropriate content
    // all of this will be returned to the console.
    for (var i = 0; i < songs.length; i++) {
      console.log("---------------------------------------------------");
      console.log("Artist: " + songs[i].artists.map(getArtistNames));
      console.log("Song: " + songs[i].name);
      console.log("Preview song: " + songs[i].preview_url);
      console.log("Album: " + songs[i].album.name);
      console.log("__________________________________________________");
    };
  });
};

// this function still needs some work
var doWhatItSays = function () {
  fs.readFile("random.text", "utf8", function (error, data) {
    var dataArr = data.split(",");
    (dataArr[1]);
  });
};


// This function needs to access the omdb api using axios 
// And then take user CLI input and assign that to a variable attached to the api
// var omdbKey = new Omdb(keys.omdb)

  // I was having trouble getting the omdb api to work, so i borrowed this get me movie function to try and figure out why mine didnt work.
  var getMovie = function(movieName) {
    movieName = (process.argv.slice(3).join(" "));
    if (movieName === undefined) {
      movieName = "Top Gun";
    };
  
  

  var urlHit = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=full&tomatoes=true&apikey=1e01f01e"
  axios.get(urlHit).then(function (response) {
    var data = response.data
    console.log("__________________________________________");
    console.log("Title: " + data.Title);
    console.log("Year: " + data.Year);
    console.log("Rated: " + data.Rated);
    console.log("IMDB Rating: " + data.imdbRating);
    console.log("Country: " + data.Country);
    console.log("Language: " + data.Language);
    console.log("-----------------------------------------------------");
    console.log("Plot: " + data.Plot);
    console.log("------------------------------------------------------");
    console.log("Actors: " + data.Actors);
    console.log("Rotten Tomatoes Rating: " + data.Ratings[0].Value);
    console.log("__________________________________________");
  });
};


var concertThis = function(artistName){
  artistName = (process.argv.slice(3).join(" "));
  
  var queryURL = "https://rest.bandsintown.com/artists/" + artistName + "/events?app_id=codingbootcamp";

  axios.get(queryURL).then(function(response){
    console.log("Upcoming events for " + artistName + ": ")
    var bandData = response.data;
    if (!bandData.length) {
      console.log("No results found for " + artistName);
      return;
    }

    
    for(i = 0; i < bandData.length; i++){
      var event = bandData[i];
      console.log(event.venue.city +
      "," +
      (event.venue.region || event.venue.country) +
      " at " +
      event.venue.name +
      " - " +
      moment(event.datetime).format("MM/DD/YYYY"))
        console.log("------------------------------------")
    }
  });
}














//  im using a switch statment to target what the user inputs


switch (process.argv[2]) {
  case "spotify-this-song":
    console.log("Finding Song info...")
    getSpoty();
    break;

  case "concert-this":
    console.log("Finding artist(s) info...")
    concertThis()
    break;

  case "movie-this":
      console.log("Finding movie info...")
      getMovie()
    break;

  case "do-what-it-says":
    
    doWhatItSays();

    break;
  default:
    console.log("I dont understand");
}









