const {MH, Discovery} = require('magic-home');

let discover = new Discovery();
discover.scan(500).then(devices => {
    console.log(devices);
});