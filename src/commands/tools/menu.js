const { SlashCommandBuilder, SelectMenuBuilder, ActionRowBuilder, SelectMenuOptionBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('menu')
        .setDescription('Returns a select menu'),
    async execute(interaction, client) {
        const menu = new SelectMenuBuilder()
            .setCustomId(`exampleMenu`)
            .setMinValues(1)
            .setMaxValues(1)
            .setOptions(
                new SelectMenuOptionBuilder({
                    label: `Option #1`,
                    value: `https://deccadome.com`
            }), new SelectMenuOptionBuilder({
                    label: `Option 2`,
                    value: `https://www.deccadome.com`
            }));

        await interaction.reply({
            components: [new ActionRowBuilder().addComponents(menu)]
        });
    }
}