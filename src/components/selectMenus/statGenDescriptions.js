const { SlashCommandBuilder, ActionRowBuilder } = require('discord.js');

module.exports = {
    data: {
        name: `statGenDescriptions`,
    },
    async execute(interaction, client) {
        method = await interaction.values[0];
        //console.log(method);
        if(method == 'standard') {
            await interaction.update({ content: `**Choose your Ability Score generation method.**\n*Standard* - Assign your scores from a fixed list (15, 14, 13, 12, 10, 8).` });
        } else if(method == 'pointBuy') {
            await interaction.update({ content: `**Choose your Ability Score generation method.**\n*Point Buy* - You will be given 27 points to spend on your Ability Scores.`});
        } else if(method == 'manual') {
            await interaction.update({ content: `**Choose your Ability Score generation method.**\n*Manual* - Manually input your Ability Scores.`});
        } else if(method == 'roll') {
            await interaction.update({ content: `**Choose your Ability Score generation method.**\n*Roll* - Assign 6 randomly-generated numbers to your Ability Scores.`});
        }
    }
}