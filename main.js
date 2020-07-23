
//required functions
const http = require('http');
const Twit = require('Twit');
const config = require('./config');

//for http
const hostname = '127.0.0.1';
const port = 3000;

//for twit
var T = new Twit (config);

//http init
const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('hello world!');
});

//http complete
server.listen(port, hostname, () => {
    console.log(`server running at http://${hostname}:${port}`);

});