const config = require('./config');
const Discord = require(`discord.js`);
const fs = require('fs');
const Jimp = require('jimp');
const request = require('request').defaults({encoding:null});
let image;

var args = process.argv;
const client = new Discord.Client();

client.once('ready', () => {
    console.log(`Successfully logged in as ${client.user.tag}!`)
});

client.on('message', msg => {
    if (msg.content.toLowerCase().includes("daddy") && config.daddymode) {
        msg.channel.send(":weary:");
    }

    if (!msg.content.startsWith(config.discord.prefix) || msg.author.bot) return;//don't respond to messages not calling it

    console.log(`${msg.author.username}: ${msg.content} [in: ${msg.guild.name}]`);//log command call
    
    args = msg.content.slice(config.discord.prefix.length).trim().split(' ');//get command and arguments
    command = args.shift().toLowerCase();//take command, leave arguments
    
    switch(command) {
        case('downrez'):
            //check to see if both arguments are specified:
            if (args.length != 2) {
                return msg.channel.send("Usage: downrez [width] [height]");
            }
            //if both args are numbers
            else if (msg.attachments.size == 1) {//if there's only one attachment
                console.log(msg.attachments.array()[0].url);
                try {
                    request.get(msg.attachments.array()[0].url, function(error, response, body) {
                        if (!error && response.statusCode == 200) {//if image existed
                            image = Buffer.from(body);//import buffer into image var
                            var imgurl = msg.attachments.array()[0].url.split('.');//get image url
                            var extension = imgurl[imgurl.length-1];//use image url to get extension
                            if (extension == ("jpg" || "png" || "bmp" || "tiff" || "gif")) {//check if extension is valid like you
                                
                            }
                            else {
                                msg.channel.send(':x: Invalid attachment type!');
                            }
                        }
                    });
                    //console.log(image);
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
        default:
            break;
    }
});

client.login(config.discord.token);