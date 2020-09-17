const {MH, Discovery, Control} = require('magic-home');
const prompt = require('prompt');

let discover = new Discovery();
controller = new Control();

let discovered;

var scan = function() {
    return new Promise(resolve => {
        discover.scan(1000).then(devices => {
            console.log("returned values")
            resolve(devices);
        });
    });
}

var layout = Object;

//var countdown = async function(from) {
//    for (x=0; x<=from, x++;) {
//        setTimeout(() => {
//            console.log(from-x+" seconds remaining.");
//        }, 1000)
//    }
//}

var main  = async function() {
    discovered = await scan();
    console.log("wait finished");
    console.log(discovered);
    i = 1;
    discovered.forEach(element => {
        console.log("Light "+i+" address:"+element.address);
        i++;
        controller = new Control(element.address);
        controller.turnOff();
    });
    i=1;
    discovered.forEach(element => {
        controller = new Control(element.address);
        controller.turnOn()
        //console.log("THIS IS LIGHT NUMBER "+i+"!\nWrite this down.\n");
    });
}
prompt.start();
main();