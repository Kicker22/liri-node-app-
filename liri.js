require("dotenv").config();
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var axios = require("axios");
var moment = require("moment");
var fse = require("fs-extra");
var pick = require("object.pick")

var omdbSearch = " ";
var inTownSearch = " ";
var omdbUrl = "http://www.omdbapi.com/?apikey=1e01f01e&s=" + omdbSearch;
var bandsInTown = "https://rest.bandsintown.com/artists/" + inTownSearch + "/events?app_id=codingbootcamp";






// Functions
// ===================================================================================



// i couldnt get artist names to pull on my own so i borowed this helper function. and im honestly
// not sure why it works...but it works so it stays...
var getArtistNames = function(artist) {
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
  }
  //  this function searches the spotify api for songs
  // I have it set to a limit of one for now
  spotify.search({ type: 'track', query: songName, limit: 1 }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }

    // shorthand variable to cut down on typing.
    var songs = data.tracks.items;
    // for loop to iterate throught to object arrays anb grab the appropriate content
    // all of this will be returned to the console.
    for (var i = 0; i < songs.length; i++) {
      console.log("artist: " + songs[i].artists.map(getArtistNames));
      console.log("song: " + songs[i].name);
      console.log("preview song: " + songs[i].preview_url);
      console.log("album: " + songs[i].album.name);
      console.log("__________________________________________________");
    }
  });
}



// Function for running a command based on text file
var doWhatItSays = function(getSpoty) {
  fs.readFile("random.text", "utf8", function(error, data) {
    var dataArr = data.split(",");
      (dataArr[1]);
  });
};





//  im using a switch statment to target what the user inputs

 
   switch (process.argv[2]) {
     case "spotify-this-song":
       getSpoty()
       break;
   
     case "concert-this":
   
       break;
   
     case "movie-this":
   
       break;
   
     case "do-what-it-says":
       doWhatItSays()
       
       break;
     default:
       console.log("I dont understand")
} 









