// Standard array allocation for Ability Scores
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, SelectMenuBuilder, SelectMenuOptionBuilder } = require('discord.js');

module.exports = {
    data: {
        name: `standardButton`,
    },
    async execute(interaction, client) {
        const buttonStandard = new ButtonBuilder()
            .setCustomId(`standardButton`)
            .setLabel(`Standard`)
            .setStyle(ButtonStyle.Primary)
            .setDisabled(true);
        const buttonPointBuy = new ButtonBuilder()
            .setCustomId(`pointBuyButton`)
            .setLabel(`Point Buy`)
            .setStyle(ButtonStyle.Primary);
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
        // const standardButtonConfirm = new ButtonBuilder()
        //     .setCustomId(`standardButtonConfirm`)
        //     .setLabel(`Confirm Scores`)
        //     .setStyle(ButtonStyle.Success);

        scores = [15, 14, 13, 12, 10, 8];

        

        const scoreInput = new ActionRowBuilder()
            .addComponents([
                
            ]);

        await interaction.update({
            content: `**Standard** - Assign your scores from a fixed list (15, 14, 13, 12, 10, 8).`,
            components: [
                buttonRow,
                // new ActionRowBuilder().addComponents([standardButtonConfirm])
            ]
        });


    }
}