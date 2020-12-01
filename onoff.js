const fs = require("fs");
const BulbController = require("magic-hue-controller");

ld = JSON.parse(fs.readFileSync("./src/json/lightData.json"));
args = process.argv.slice(2);
ip = (ld[args[0]].address);

var controller = new BulbController(ip);

function delay(ms=1000) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    })
}

async function blink() {
    while(true) {
        controller.sendPower(false);
        await delay(1000);
        controller.sendPower(true);
        await delay(1000);
    }
}
blink()