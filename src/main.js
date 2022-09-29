require("dotenv").config();
const { token, databaseToken } = process.env;
const { connect } = require('mongoose');
const { Client, Collection, GatewayIntentBits } = require("discord.js");
const fs = require("fs");
const { callbackify } = require("util");
const { refreshWeapons } = require("./functions/startup/refreshWeapons");

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
        else if(folder == "startup"){
            require(`./functions/${folder}/${file}`);
        }
}

client.handleEvents();
client.handleCommands();
client.handleComponents();
client.login(token);
(async() =>{
    await connect(databaseToken).catch(console.error);
    await refreshWeapons().catch(console.error);
})();
