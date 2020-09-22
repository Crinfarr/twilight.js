const Jimp = require("jimp");
const gp = require("get-pixels");
const { promises } = require("fs");

var cmdArgs = process.argv;
var rW = parseInt(cmdArgs[3]);
var rH = parseInt(cmdArgs[4]);
console.log(cmdArgs);
let imgOut;
if (cmdArgs[5] == undefined) {
    filename = `img(${rW} by ${rH}).jpg`
} 
else filename = cmdArgs[5];

resizeImage = async function() {
    return new Promise(resolve => {
        Jimp.read(cmdArgs[2], (err, image) => {
            if (err) throw err;
            imgOut = image.contain(rW, rH).autocrop().write(`./tmpimages/${filename}`);
            resolve(imgOut);
        });
    });
}

main = async function() {
    console.log(await resizeImage()+`\nImage name: ${filename}`);
}

main();