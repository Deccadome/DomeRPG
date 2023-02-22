const { SlashCommandBuilder } = require('discord.js');
const Tools = require('../../functions/tools/tools.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Returns my ping'),
    async execute(interaction, client) {
        const message = await interaction.deferReply({
            fetchReply: true
        });

        const newMessage = `API Latency: ${client.ws.ping}\nClient Ping: ${message.createdTimestamp - interaction.createdTimestamp}`;
        await interaction.editReply({
            content: newMessage
        });

        test = "Help Me";
        console.log(Tools.formatSlug(test));
    }
}