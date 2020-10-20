const config = import('../config.js.js');
const {MH, Discovery, Control} = require('magic-home');
const fs = require('fs');

var args = process.argv;
var onoff = args[3];
var lightIndex = args[2];

function main() {
    lightdata = JSON.parse(fs.readFileSync("lightData.json"));
    console.log("reached pre-switch");
    switch (onoff.toLowerCase()){
        case ("on"):
            var ctrl = new Control(lightdata[lightIndex].address);
            ctrl.turnOn();
            console.log(`turned light ${lightIndex} ${onoff.toLowerCase()}: pinged ${lightdata[lightIndex].address} with ${onoff.toUpperCase()}`);
            break;
        case ("off"):
            var ctrl = new Control(lightdata[lightIndex].address);
            ctrl.turnOff();
            console.log(`turned light ${lightIndex} ${onoff.toLowerCase()}: pinged ${lightdata[lightIndex].address} with ${onoff.toUpperCase()}`);
            break;
        default:
            console.error("invalid statement: "+onoff);
            break;
    }
}
main();