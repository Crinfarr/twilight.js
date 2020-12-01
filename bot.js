const config = require('./src/scripts/config');
const Discord = require(`discord.js`);
const fs = require('fs');
const mh = require('magic-home');
const Jimp = require('jimp');
const { Control } = require('magic-home');
const request = require('request').defaults({encoding:null});

var args = process.argv;
const client = new Discord.Client();

client.once('ready', () => {
    console.log(`Successfully logged in as ${client.user.tag}!`)
});

async function getImg(url, path) {
    return new Promise(resolve => {
        request.get(url, function (error, response, body) {
            fs.writeFileSync(path, Buffer.from(body));
            resolve();
        });
    })
}

client.on('message', async msg => {
        if (msg.content.toLowerCase().includes("daddy") && config.daddymode) {
            msg.channel.send(":weary:");
        }

        if (!msg.content.startsWith(config.discord.prefix) || msg.author.bot) return; //don't respond to messages not calling it
        console.log(`${msg.author.username}: ${msg.content} [in: ${msg.guild.name}]`); //log command call

        args = msg.content.slice(config.discord.prefix.length).trim().split(' '); //get command and arguments
        command = args.shift().toLowerCase(); //take command, leave arguments

        switch (command) {
            /* case ('downrez'):
                //check to see if both arguments are specified:
                if (args.length != 2) {
                    return msg.channel.send("Usage: downrez [width] [height]");
                }

                //if both args are numbers
                else if (msg.attachments.size == 1) { //if there's only one attachment
                    try {
                        console.log(msg.attachments.array()[0].url);
                        var imgurl = msg.attachments.array()[0].url; //get image url
                        var extension = imgurl.split(".")[imgurl.split(".").length - 1]; //use image url to get extension
                        var path = `./tmpimages/image.${extension}`;
                        var rspath = `./rstmpimages/rsimage.${extension}`;
                        getImg(imgurl, path).then(function() {
                            Jimp.read(path).then(img => {
                                img.contain(parseInt(args[0]), parseInt(args[1])).autocrop().write(rspath);
                            }).then(function() {
                                //var embed = new Discord.MessageEmbed()
                                //    .setTitle(`:black_large_square:Here's your image resized to ${args[0]} by ${args[1]}!`)
                                //    .attachFiles([rspath])
                                //    .setImage(`attachment://rsimage.${extension}`);
                                //msg.channel.send(embed);
                                attachment = new Discord.MessageAttachment(rspath);
                                msg.channel.send(`Here's your image resized to ${args[0]} by ${args[1]}, <@${msg.author.id}>!`, attachment);
                            }).finally(function() {
                                fs.unlinkSync(path);
                                fs.unlinkSync(rspath);
                            });
                        })
                        
                    }
                    catch(err) {
                        msg.channel.send(`:x: JS Error: ${err}`);
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
                break; */
            case("lighton"): 
                if (args.length != 1) {
                    msg.channel.send("Usage: lighton [light]\n\nUse !lights for a list of lights.");
                }
                else {
                    var ctrl = new Control(config.lighting.lights[config.lighting.lightindexes[args[0].toUpperCase()]].address);
                    var embed = new Discord.MessageEmbed()
                        .setColor('#FFFF00')
                        .setTitle(`${args[0].toUpperCase()} turned on by ${msg.author.username}!`)
                        .setThumbnail(msg.author.avatarURL)
                        .attachFiles(['./images/Twilightjs_logo_sm.png'])
                        .setAuthor('TwilightBot', 'attachment://Twilightjs_logo_sm.png')
                        .setTimestamp();
                    ctrl.turnOn();
                    msg.channel.send(embed);
                }
                break;
            case("lightoff"):
                if (args.length != 1) {
                    msg.channel.send("Usage: lightoff [light]\n\nUse !lights for a list of lights.");
                }
                else {
                    var ctrl = new Control(config.lighting.lights[config.lighting.lightindexes[args[0].toUpperCase()]].address);
                    var embed = new Discord.MessageEmbed()
                        .setColor('#000000')
                        .setTitle(`${args[0].toUpperCase()} turned off by ${msg.author.username}!`)
                        .setThumbnail(msg.author.avatarURL)
                        .attachFiles(['./images/Twilightjs_logo_sm.png'])
                        .setAuthor('TwilightBot', 'attachment://Twilightjs_logo_sm.png')
                        .setTimestamp();
                    ctrl.turnOff();
                    msg.channel.send(embed);
                }
                break;
            /* case("lightcolor"):
                if (args.length != 2) {
                    msg.channel.send("Usage: lightcolor [light] [hex color]\n\n")
                }
                else {
                    var TMPcolor = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(args[1]);
                    try {
                        var color = {
                            hex: TMPcolor[0],
                            r: parseInt(TMPcolor[1], 16),
                            g: parseInt(TMPcolor[2], 16),
                            b: parseInt(TMPcolor[3], 16)
                        }
                    }
                    catch {
                        msg.channel.send(':x: Invalid color!')
                        return;
                    }
                    //console.log(`R: ${color.r}\nG: ${color.g}\nB: ${color.b}\nHEX: ${color.hex}`);
                    var ctrl = new Control(config.lighting.lights[config.lighting.lightindexes[args[0].toUpperCase()]].address);
                    var embed = new Discord.MessageEmbed()
                        .setColor(color.hex)
                        .setTitle(`${args[0].toUpperCase()} set to ${color.hex} by ${msg.author.username}!`)
                        .setThumbnail(msg.author.avatarURL)
                        .attachFiles(['./images/Twilightjs_logo_sm.png'])
                        .setAuthor('TwilightBot', 'attachment://Twilightjs_logo_sm.png')
                        .setTimestamp();
                    try {ctrl.setColor(color.r, color.g, color.b)} catch (err) {};
                    msg.channel.send(embed);
                }
                break; */
            case("lights"):
                msg.channel.send(config.lighting.lightdesc);
                break;
            case ('help'):
                var embed = new Discord.MessageEmbed()
                    .setTitle("Command reference")
                    //.setDescription("!lights: Lists available lights to change\n!downrez [x resize] [y resize]: Resizes most attached images\n!lighton [light ID]: powers on a light\n!lightoff [light ID]: powers off a light\n\n!lightcolor COMING SOON.");
                    .setDescription("!lights: Lists available lights to change\n!lighton [light ID]: powers on a light\n!lightoff [light ID]: powers off a light\n\n!lightcolor [light ID] [6 digit hex color]");
                msg.channel.send(embed);
                break;
            default:
                break;
        }
    });

client.login(config.discord.token);