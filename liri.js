var request = require("request");
var fs = require("fs");
var keys = require("./keys.js");
var spotify = require("node-spotify-api");
var Twitter = require("twitter");

//grabbing data from keys.js
var consumerKey = keys.twitterKeys.consumer_key;
var consumerSecret = keys.twitterKeys.consumer_secret;
var accessTKey = keys.twitterKeys.access_token_key;
var accessTSecret = keys.twitterKeys.access_token_secret;
var userCommand = process.argv[2];
var userComMod = process.argv[3];

switch(userCommand) {
	case "tweets":
		Tweets();
		break;

	case "spotify":
		spotifyfunc();
		break;

	case "moviesearch":
		ombdAPI();
		break;

	// case "do-what-it-says"
	// 	do this;
	// 	break;
}

function ombdAPI() {
	var theRequest = "";
	for (let i = 3; i < process.argv.length; i++) {
		theRequest = theRequest + process.argv[i];

	}

	var queryURL = "http://www.omdbapi.com/?t=" + theRequest + "&y=&plot=short&apikey=40e9cece";
	request(queryURL, function(error, response, body) {
		if (error) {
			console.log(error);
		}

		if (response.statusCode === 200) {
			var ombd = JSON.parse(body);
			console.log("-------------------------------------------------------------");
			console.log(" Movie: " + ombd.Title);
			console.log("  Made: " + ombd.Year);
			console.log("Rating: " + ombd.Ratings[0].Source + "= " + ombd.Ratings[0].Value);
			console.log("Rating: " + ombd.Ratings[1].Source + "= " + ombd.Ratings[1].Value);
			console.log("Made in " + ombd.Country);
			console.log("-----------------------------");
			console.log("Genres! " + ombd.Genre);
			console.log("-----------------------------");
			console.log("The main actors are " + ombd.Actors);
			console.log("-----------------------------");
			console.log("Directed by " + ombd.Director);
			console.log("-----------------------------");
			console.log("You can watch this movie in " + ombd.Language);
			console.log("-----------------------------");
			console.log("Long long ago in a land far far away " + ombd.Plot);
		}
	})
}

function Tweets() {
    var client = new Twitter({
			consumer_key: consumerKey,
			consumer_secret: consumerSecret,
			access_token_key: accessTKey,
			access_token_secret: accessTSecret
		});

		//POSTING TO TWITTER
		// client.post("statuses/update", {status: "I am a tweet"}, function(error, tweet, response) {
		// 	if (!error) {
		// 		console.log(tweet.text);
		// 	}
		// })


		//STREAMING FROM TWITTER
		// client.stream("statuses/filter", {track: "twitter"}, function(stream) {
		// 		stream.on('data', function(tweet) {
		// 			for (let i = 0; i < 1; i++) {
		// 			console.log(tweet[i].text);
		// 		  }
		// 		});
		//
		// 		stream.on('error', function(error) {
		// 			console.log(error);
		// 		});
		// });

		client.get("statuses/user_timeline", function(error, tweets, response) {
			if(error) {
				console.log(error);
			}
			for (var i = 0; i < tweets.length; i++) {
				console.log(tweets[i].text);
		  }
		});

}

function spotifyfunc() {
	var client = new spotify({
		id: keys.spotifykeys.client_ID,
		secret: keys.spotifykeys.client_secret
	});
	var query = "";
	for (let i = 3; i < process.argv.length; i++){
		query = query + " " + process.argv[i];
	}
	client.search({type: 'track', query: query }, function(error, data) {
		if (error) {
			console.log(error);
		}
		console.log(data);
	})
}
