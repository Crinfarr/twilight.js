
//required functions
const Twit = require('Twit');
const config = require('./config');

//for twit
var T = new Twit (config);

function testtweet() {
    T.post('statuses/update', {status: 'this is a test tweet from a bad idea by @rb_farr', function(err, data, response) {
        console.log(data);
    }});
}

testtweet();