const {MH, Discovery, Control} = require('magic-home');

let discover = new Discovery();

var scan = function() {
    return new Promise(resolve => {
        discover.scan(500).then(devices => {
            console.log("returned values")
            resolve(devices);
        });
    });
}

var main  = async function() {
    const discovered = await scan();
    console.log("wait finished");
    console.log(discovered);
    //console.log(discovered.length);//should equal 4 or 5
    //console.log(discovered[0]);
    //for (i = 0; i <= discovered.length; i++) {
    //    console.log(discovered[i]);
    //}
    //test secondary version:
    i = 1;
    discovered.forEach(element => {
        
        console.log("Light "+i+" address:"+element.address);
        i++;
    });
}
main();
