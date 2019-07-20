require("dotenv").config();
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");

var omdbSearch = " ";
var inTownSearch = " ";
var omdbUrl = "http://www.omdbapi.com/?apikey=1e01f01e&s=" + omdbSearch;
var bandsInTown = "https://rest.bandsintown.com/artists/" + inTownSearch + "/events?app_id=codingbootcamp";






// Functions
// ====================================================================================

// write a function that grabs the information from spotify API;

// these are my spotify keys
var spotify = new Spotify(keys.spotify);

var getSpoty = function(songName){
    if(songName === undefined){
        songName = "Everybody wants to rule the world"
    }
    //  this function searches the spotify api for songs aka tracks i have it set to a limit of one for now
    spotify.search({ type: 'track', query: songName, limit:1 }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
        
        var songs = data.tracks.items;
        for (var i = 0; i < songs.length; i++) {
            console.log("song name: " + songs[i].name);
            console.log("preview song: " + songs[i].preview_url);
            console.log("album: " + songs[i].album.name);
            console.log("-----------------------------------");
          }
    


    });
}

getSpoty()










