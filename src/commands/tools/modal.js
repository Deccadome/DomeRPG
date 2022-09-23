const { SlashCommandBuilder, ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('modal')
        .setDescription('Returns a modal'),
    async execute(interaction, client) {
        const modal = new ModalBuilder()
            .setCustomId(`exampleModal`)
            .setTitle(`Favorite Color?`);

        const textInput = new TextInputBuilder()
            .setCustomId(`favColorInput`)
            .setLabel(`What is your favorite color?`)
            .setRequired(true)
            .setStyle(TextInputStyle.Short); // paragraph also an option

        modal.addComponents(new ActionRowBuilder().addComponents(textInput));

        await interaction.showModal(modal);
    }
}