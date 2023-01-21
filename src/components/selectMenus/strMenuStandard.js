const mongoose = require('mongoose');
const Character = require('../../schemas/character.js');

module.exports = {
    data: {
        name: `strButtonStd`
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
        const methodButtonRow = new ActionRowBuilder()
            .addComponents([
                buttonStandard, buttonPointBuy, buttonManual, buttonRoll
            ]);
            
        scores = [15, 14, 13, 12, 10, 8];
            
        const strButton = new ButtonBuilder()
            .setCustomId(`strButtonStd`)
            .setLabel(`Strength (STR)`)
            .setStyle(ButtonStyle.Secondary);
        const dexButton = new ButtonBuilder()
            .setCustomId(`dexButtonStd`)
            .setLabel(`Dexterity (DEX)`)
            .setStyle(ButtonStyle.Secondary);
        const conButton = new ButtonBuilder()
            .setCustomId(`conButtonStd`)
            .setLabel(`Constitution (CON)`)
            .setStyle(ButtonStyle.Secondary);
        const intButton = new ButtonBuilder()
            .setCustomId(`intButtonStd`)
            .setLabel(`Intelligence (INT)`)
            .setStyle(ButtonStyle.Secondary);
        const wisButton = new ButtonBuilder()
            .setCustomId(`wisButtonStd`)
            .setLabel(`Wisdom (WIS)`)
            .setStyle(ButtonStyle.Secondary);
        const chaButton = new ButtonBuilder()
            .setCustomId(`chaButtonStd`)
            .setLabel(`Charisma (CHA)`)
            .setStyle(ButtonStyle.Secondary);

        
    }
}