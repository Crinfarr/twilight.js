const config = require('./config');
var args = process.argv;

var timeout = (args[2] != undefined) ? args[2] : 300000 //default timeout to 5 minutes if not specified
