const { SlashCommandBuilder } = require('discord.js');
const Tools = require('../../functions/tools/tools.js')

module.exports = {
    //setname should be the name of the file and what the user types: E.x. "/mycharacters"
    //description is the context that the user reads from the command popup : E.x. "Shows all your existing characters"
    data: new SlashCommandBuilder()
        .setName('[what user types]')
        .setDescription('[description]'),
    async execute(interaction, client) {
        
    }
}