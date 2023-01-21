const { SlashCommandBuilder } = require('discord.js');
const Tools = require('../../functions/tools/tools.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('collectorsTest')
        .setDescription('Code storage'),
    async execute(interaction, client) {
        client.on(Events.InteractionCreate, async interaction => {
            
        });
    }
}