const Jimp = require("jimp");
const { getPixelColor } = require("jimp");
const fs = require("fs");

var cmdArgs = process.argv;
var imgIn = (cmdArgs[2] != undefined) ? cmdArgs[2] : "./images/testimg.jpg";
var rW = (cmdArgs[3] != undefined) ? parseInt(cmdArgs[3]) : 10;
var rH = (cmdArgs[4] != undefined) ? parseInt(cmdArgs[4]) : 10;
var filename = (cmdArgs[5] != undefined) ? cmdArgs[5] : `img(${rW} by ${rH}).jpg`;
console.log(cmdArgs);
let imgOut;
pixels = new Object;


resizeImage = async function() {
    return new Promise(resolve => {
        Jimp.read(imgIn, (err, img) => {
            if (err) throw err;
            imgOut = img.contain(rW, rH).autocrop().write(`./tmpimages/${filename}`);
            resolve(imgOut);
        });
    });
}

main = async function() {
    console.log(await resizeImage()+`\nImage name: ${filename}`);
    for (i=0; i<=rW; i++) {
        var newkey = {}
        for (j=0; j<=rH; j++) {
            newkey[j] = (imgOut.getPixelColor(i, j).toString(16).length != 1) ? imgOut.getPixelColor(i, j).toString(16).substring(0, imgOut.getPixelColor(i, j).toString(16).length-2) : imgOut.getPixelColor(i, j).toString(16)+"00000";
        }
        pixels[i] = newkey;
    }
    //console.log(pixels)
    //try {fs.unlinkSync(`./tmpimages/${filename}`)} catch(err) {console.error(err)}
    fs.writeFileSync(`./tmpimages/${filename} pixel data.json`, JSON.stringify(pixels));
}

main();