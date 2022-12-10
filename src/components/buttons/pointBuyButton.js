// Point Buy assignment for Ability Scores
const { ActionRowBuilder, SelectMenuBuilder, SelectMenuOptionBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    data: {
        name: `pointBuyButton`,
    },
    async execute(interaction, client) {
        const buttonStandard = new ButtonBuilder()
            .setCustomId(`standardButton`)
            .setLabel(`Standard`)
            .setStyle(ButtonStyle.Primary);
        const buttonPointBuy = new ButtonBuilder()
            .setCustomId(`pointBuyButton`)
            .setLabel(`Point Buy`)
            .setStyle(ButtonStyle.Primary)
            .setDisabled(true);
        const buttonManual = new ButtonBuilder()
            .setCustomId(`manualButton`)
            .setLabel(`Manual`)
            .setStyle(ButtonStyle.Primary);
        const buttonRoll = new ButtonBuilder()
            .setCustomId(`rollButton`)
            .setLabel(`Roll`)
            .setStyle(ButtonStyle.Primary);
        const buttonRow = new ActionRowBuilder()
            .addComponents([
                buttonStandard, buttonPointBuy, buttonManual, buttonRoll
            ]);

        await interaction.update({ 
            content: `**Point Buy** - Spend up to 27 points on Ability Scores`,
            components: [buttonRow]
        });


    }
}