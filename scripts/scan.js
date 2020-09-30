'use strict';

const {MH, Discovery, Control} = require('magic-home');
const fs = require('fs');

let discover = new Discovery();
let controller = new Control();

let discovered;
let i;
var scan = function() {
    return new Promise(resolve => {
        discover.scan(2000).then(devices => {
            console.log("returned values")
            resolve(devices);
        });
    });
}

/*
var lightsOut = function() {
    discovered.forEach(element => {
        controller = new Control(element.address);
        controller.turnOff();
    });
}

var lightsUp = function() {
    discovered.forEach(element => {
        controller = new Control(element.address);
        controller.turnOn();
    });
}
*/

var lightsChange = function(OnOff) {
    discovered.forEach(element => {
        controller = new Control(element.address);
        switch (OnOff){
            case "on":
                controller.turnOn();
                break;
            case "off":
                controller.turnOff();
                break;
        }
    })
}

var main  = async function() {
    discovered = await scan();
    console.log("scan finished");
    console.log(discovered);
    i = 1;
    lightsChange("off");
    setTimeout(() => {
        lightsChange("on");
    }, 10000);
}

main();
console.log("writing to file in 15 seconds");
setTimeout(() => {fs.writeFile("lightData.json", JSON.stringify(discovered), (err) =>{
    if (err) throw err;
    console.log("wrote data to file: lightData.json");
    })
}, 15000);