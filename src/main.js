require("dotenv").config();
const { token, databaseToken } = process.env;
const mongoose = require('mongoose');
const { Client, Collection, GatewayIntentBits } = require("discord.js");
const fs = require("fs");
const { callbackify } = require("util");
const Startup = require("./functions/startup/startupTools");
const Tests = require("./functions/tests/test.js");

//const { Guilds, GuildMessages } = GatewayIntentBits;
//const client = new Client({ intents: [Guilds, GuildMessages] });
// 32767 = all intents
const client = new Client({ intents: 32767 });
client.commands = new Collection();
client.buttons = new Collection();
client.selectMenus = new Collection();
client.modals = new Collection();
client.commandArray = [];

const functionFolders = fs.readdirSync('./src/functions');
for(const folder of functionFolders){
    const functionFiles = fs
        .readdirSync(`./src/functions/${folder}`)
        .filter((file) => file.endsWith(".js"));
    for(const file of functionFiles) 
        if(folder == "handlers"){
            require(`./functions/${folder}/${file}`)(client);
        }
        else if(folder == "startup" || folder == "tests"){
            require(`./functions/${folder}/${file}`);
        }
}

client.handleEvents();
client.handleCommands();
client.handleComponents();
client.login(token);
(async() =>{
    await mongoose.connect(databaseToken).catch(console.error);
    await Startup.refreshCheck("./src/functions/startup/refreshSpells.js");
    await Startup.refreshCheck("./src/functions/startup/refreshWeapons.js");
})();
