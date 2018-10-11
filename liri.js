require("dotenv").config();
var Spotify = require('node-spotify-api');
var moment = require('moment');
var keys = require("./keys.js");
var fs = require("fs");


var request = require('request');

var spotify = new Spotify(keys.spotify);

if (process.argv[2] === "movie-this") {

    var movieName = process.argv.slice(3).join(" ");

    if (movieName.length === 0) {
        movieName = "Mr. Nobody.";
    }

    // We then run the request module on a URL with a JSON
    request("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=" + keys.imdb.id, function (error, response, body) {

        // If there were no errors and the response code was 200 (i.e. the request was successful)...
        if (!error && response.statusCode === 200) {

            // Then we print out the imdbRating
            console.log("The title of the movie: " + JSON.parse(body).Title + "\nYear: " + JSON.parse(body).Year +
                "\nThe movie's rating is: " + JSON.parse(body).imdbRating + "\nRotten Tomatoes rating is: " + JSON.parse(body).Ratings[2].Value
                + "\nCountry: " + JSON.parse(body).Country + "\nLanguage: " + JSON.parse(body).Language + "\nPlot: " + JSON.parse(body).Plot
                + "\nActors: " + JSON.parse(body).Actors);
        }
    });

}

if (process.argv[2] === "concert-this") {
    var artist = process.argv.slice(3).join(" ");
    console.log(artist);

    request("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=" + keys.BandsInTown.id, function (error, response, body) {

        if (!error && response.statusCode === 200) {
            console.log("Name of the venue is: " + JSON.parse(body)[1].venue.name +
                "\nVenue location is:" + JSON.parse(body)[1].venue.city + "," + JSON.parse(body)[1].venue.country +
                "\nDate of the event is:" + moment(JSON.parse(body)[1].datetime).format('MM/DD/YYYY'));
        }
    });
}

if (process.argv[2] === "spotify-this-song") {

    var song = process.argv.slice(3).join(" ");

    if (song.length === 0) {
        song = "The Sign";
    }
    spotify.search({ type: 'track', query: song, limit: 1 }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        //console.log(JSON.stringify(data, null, 2));
        console.log("\nThe artist is: "+ data.tracks.items[0].album.artists[0].name);
        console.log("\nThe song's name is: " + song);
        console.log("\nA preview link: " + data.tracks.items[0].album.external_urls.spotify);
        console.log("\nName of the album is:" + data.tracks.items[0].album.name);
    });
}

if (process.argv[2] === "do-what-it-says") {
    fs.readFile("random.txt", "utf8", function (error, data) {

        if (error) {
            return console.log(error);
        }

        var dataArr = data.split(",");

        if (dataArr[0] === "spotify-this-song") {
            var song = dataArr.slice(1).join(" ");

            if (song.length === 0) {
                song = "The Sign";
            }
            spotify.search({ type: 'track', query: song }, function (err, data) {
                if (err) {
                    return console.log('Error occurred: ' + err);
                }

                console.log(data);
            });
        }

        if (dataArr[0] === "movie-this") {

            var movieName = dataArr.slice(1).join(" ");

            if (movieName.length === 0) {
                movieName = "Mr. Nobody.";
            }

            // We then run the request module on a URL with a JSON
            request("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=" + keys.imdb.id, function (error, response, body) {

                // If there were no errors and the response code was 200 (i.e. the request was successful)...
                if (!error && response.statusCode === 200) {

                    // Then we print out the imdbRating
                    console.log("The title of the movie: " + JSON.parse(body).Title + "\nYear: " + JSON.parse(body).Year +
                        "\nThe movie's rating is: " + JSON.parse(body).imdbRating + "\nRotten Tomatoes rating is: " + JSON.parse(body).Ratings[2].Value
                        + "\nCountry: " + JSON.parse(body).Country + "\nLanguage: " + JSON.parse(body).Language + "\nPlot: " + JSON.parse(body).Plot
                        + "\nActors: " + JSON.parse(body).Actors);
                }
            });

        }

        if (dataArr[0] === "concert-this") {
            var artist = dataArr.slice(1).join(" ");
            console.log(artist);
            request("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=" + keys.BandsInTown.id, function (error, response, body) {

                if (!error && response.statusCode === 200) {
                    console.log("Name of the venue is: " + JSON.parse(body)[1].venue.name +
                        "\nVenue location is:" + JSON.parse(body)[1].venue.city + "," + JSON.parse(body)[1].venue.country +
                        "\nDate of the event is:" + moment(JSON.parse(body)[1].datetime).format('MM/DD/YYYY'));
                }
            });
        }

    });
}