const config = require('./config');
const Discord = require(`discord.js`);
const fs = require('fs');
const request = require('request').defaults({encoding:null});
let image;

var args = process.argv;
const client = new Discord.Client();

client.once('ready', () => {
    console.log(`Successfully logged in as ${client.user.tag}!`)
});

client.on('message', msg => {
    //if (msg.author.username = client.username) return;
    console.log(`${msg.author.username}: ${msg.content}`);
    if (msg.content.includes("!downrez")) {
        if (msg.attachments.size == 1) {
            //console.log('saw an image');
            //msg.channel.send(`Saw an image from <@${msg.author.id}>`);
            console.log(msg.attachments.array()[0].url);
            try {
                request.get(msg.attachments.array()[0].url, function(error, response, body) {
                    if (!error && response.statusCode == 200) {
                        image = Buffer.from(body).toString("base64");
                        console.log(image);
                    }
                });
                console.log(image);
            }
            catch (err){
                throw(err);
            }
        }
        else if (msg.attachments.size > 1) {
            msg.channel.send(':x: Too many attachments!');
        }
        else if (msg.attachments.size < 1) {
            msg.channel.send(':x: no valid attachment!');
        }
        else {
            msg.channel.send(':x: Unknown error!');
        }
    }

    if (msg.content.toLowerCase().includes("daddy")) {
        msg.channel.send(":weary:");
    }
});

client.login(config.discord.token);