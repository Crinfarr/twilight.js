const config = require('./src/scripts/config');
const Discord = require('discord.js');
const fs = require('fs');
const BulbController = require('magic-hue-controller');

const client = new Discord.Client();

client.once("ready", () => {
    console.log("Logged in as " + client.user.tag)
});

client.on("message", async msg => {
    if (msg.author.bot) return;//no bots grr

    if (!msg.content.startsWith(config.discord.prefix)) return;
    console.log(`${msg.author.tag} called command ${msg.content.split(" ")[0]} in ${"\{" + msg.channel.guild.name + "\}"}:${msg.channel.name}`);
    d_Args = msg.content.slice(config.discord.prefix.length).trim().split(" ");
    command = d_Args.shift().toLowerCase();
    /*let me explain what ip = config.lighting.lights[config.lighting.lightindexes[d_Args[0].toUpperCase()]].address does.
    *
    * new BulbController creates an instance of the bulb controller
    * d_Args[0] gets me the light ID from the typed command in discord
    * I put it into upper case so I can search for the correct light by name instead of number, to make it more user friendly
    * passing the arg into lightindexes returns a number between 0 and n, where n is the number of lights (minus one, obv)
    * passing *that* into lights returns an array of values
    * which I then use to get the IP as a string.
    * 
    * I know it could be much easier.
    */
    switch (command.toLowerCase()) {
        case ('lighton'):
            if (d_Args.length != 1) {
                msg.channel.send("Usage: lighton [light id]\n\nUse !lights for a list of light ids.");
            }
            else {
                ip = config.lighting.lights[config.lighting.lightindexes[d_Args[0].toUpperCase()]].address
                var ctrl = new BulbController(ip);

                ctrl.isOnline().then(online => {
                    if (!online) {
                        msg.channel.send("Bulb offline. <@302211105151778826>, fix your lights!");
                    }
                    else {
                        ctrl.sendPower(true);
                        var embed = new Discord.MessageEmbed()
                            .setColor('#FFFF00')
                            .setTitle(`${d_Args[0].toUpperCase()} turned on by ${msg.author.username}!`)
                            .setThumbnail(msg.author.avatarURL)
                            .attachFiles(['./images/Twilightjs_logo_sm.png'])
                            .setAuthor('TwilightBot', 'attachment://Twilightjs_logo_sm.png')
                            .setTimestamp();
                        msg.channel.send(embed);
                    }
                })
            }
            break;
        case ('lightoff'):
            if (d_Args.length != 1) {
                msg.channel.send("Usage: lightoff [light id]\n\nUse !lights for a list of light ids.");
            }
            else {
                ip = config.lighting.lights[config.lighting.lightindexes[d_Args[0].toUpperCase()]].address
                var ctrl = new BulbController(ip);
                ctrl.isOnline().then(online => {
                    if (!online) {
                        msg.channel.send("Bulb offline. <@302211105151778826>, fix your lights!");
                    }
                    else {
                        ctrl.sendPower(false);
                        var embed = new Discord.MessageEmbed()
                            .setColor('#000000')
                            .setTitle(`${d_Args[0].toUpperCase()} turned off by ${msg.author.username}!`)
                            .setThumbnail(msg.author.avatarURL)
                            .attachFiles(['./images/Twilightjs_logo_sm.png'])
                            .setAuthor('TwilightBot', 'attachment://Twilightjs_logo_sm.png')
                            .setTimestamp();
                        msg.channel.send(embed);
                    }
                })
            }
            break;
        case ('lightcolor'):
            if (d_Args.length != 2){
                msg.channel.send("Usage: lightcolor [light id] [hex color]\n\nUse !lights for a list of light ids.");
            }
            else {
                ip = config.lighting.lights[config.lighting.lightindexes[d_Args[0].toUpperCase()]].address
                var ctrl = new BulbController(ip);
                ctrl.isOnline().then(online => {
                    if (!online) {
                        msg.channel.send("Usage: lightcolor [light id] [hex color]\n\nUse !lights for a list of light ids.");
                    }
                    else {
                        var TMPcolor = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(d_Args[1]);
                        try {
                            var color = {
                                hex: TMPcolor[0],
                                r: parseInt(TMPcolor[1], 16),
                                g: parseInt(TMPcolor[2], 16),
                                b: parseInt(TMPcolor[3], 16)
                            }
                        }
                        catch(err) {
                            msg.channel.send(':x: invalid color!');
                            return;
                        }
                        ctrl.sendRGB(`${color.r},${color.g},${color.b}`, "AK001-ZJ2101");
                        var embed = new Discord.MessageEmbed()
                            .setColor(color.hex)
                            .setTitle(`${d_Args[0].toUpperCase()} set to ${color.hex} by ${msg.author.username}!`)
                            .setThumbnail(msg.author.avatarURL)
                            .attachFiles(['./images/Twilightjs_logo_sm.png'])
                            .setAuthor('TwilightBot', 'attachment://Twilightjs_logo_sm.png')
                            .setTimestamp();
                        msg.channel.send(embed);
                    }
                })
            }
            break;
        case ('lights'):
            msg.channel.send(config.lighting.lightdesc);
            break;
        case ('help'):
            var embed = new Discord.MessageEmbed()
                    .setTitle("Command reference")
                    .setDescription("!lights: Lists available lights to change\n!lighton [light ID]: powers on a light\n!lightoff [light ID]: powers off a light\n\n!lightcolor [light ID] [6 digit hex color]");
            msg.channel.send(embed);
            break;
    }
});

client.login(config.discord.token);