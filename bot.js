var twitter = require('twit');
const config = require('./config');
var args = process.argv;

var timeout = (args[2] != undefined) ? args[2] : 300000 //default timeout to 5 minutes if not specified
var client = new twitter(config);

/*var main = function() {

}

setInterval(main(), timeout)*/

/*client.get('statuses/mentions_timeline', {screen_name: "rb_farr"}, function (error, tweets, response) {
    if (!error) {
        console.log(tweets)
    }
});*/

client.stream('statuses/filter', {}) //TODO: this