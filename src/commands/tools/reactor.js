const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('reactor')
        .setDescription('Returns reactions'),
    async execute(interaction, client) {
        const message = await interaction.reply({
            content: `React here`,
            fetchReply: true
        });

        const emoji = client.emojis.cache.get('1021439183853727838');
        //const emoji1 = client.emojis.cache.find(emoji => emoji.name = ':green_apple:');

        // searching all servers for ID that bot is in
        // const emoji1 = client.emojis.cache.find(emoji => emoji.id = '1021439183853727838');

        message.react(emoji);
        message.react('🍏');

        const filter = (reaction, user) => {
            return reaction.emoji.name == '🍏' && user.id == interaction.user.id;
        };

        const collector = message.createReactionCollector({
            filter, max: 1, time: 15000
        });

        collector.on('collect', (reaction, user) => {
            console.log(`Collected ${reaction.emoji.name} from ${user.tag}`);
        });

        collector.on('end', collected => {
            console.log(`Collected ${collected.size} items`);
        });
    }
}