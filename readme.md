# TWILIGHT.js
## a library to make annoying yourself EVEN EASIER.

## config steps:
1. Run `setup.bat`<sub>windows</sub> or `setup.sh`<sub>linux</sub> to scan your network for lights.
2. fill in the blanks in `/src/config.js.example` and rename it to `config.js`.
2a. the program `onoff.js` can help you fill in the light index section of the config.  Just run `onoff [index] and it will blink the specified light until stopped.
<sub>I'm working on a better setup utility but ssshhh its a secret</sub>
3. to invite the bot to your server, [click here](https://discordapi.com/permissions.html#52224) and fill in your client ID. I've already set the permissions integer for you.
4. Whenever you want to run the bot, just run `node bot.js` or `run.bat/sh`.

special thanks to [@kolllor33](https://github.com/kolllor33) and [@jangxx](https://github.com/jangxx) for the MagicHome Node libraries!