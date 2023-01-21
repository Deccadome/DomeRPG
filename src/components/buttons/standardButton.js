// Standard array allocation for Ability Scores
const { Events, ComponentType, ActionRowBuilder, ButtonBuilder, ButtonStyle, SelectMenuBuilder, SelectMenuOptionBuilder } = require('discord.js');
const { populateOptions } = require('../../functions/tools/charCreationTools.js');
const { removeByValue } = require('../../functions/tools/tools.js');
const mongoose = require('mongoose');
const { deleteOne } = require('../../schemas/scroll.js');

const STR = 0;
const DEX = 1;
const CON = 2;
const INT = 3;
const WIS = 4;
const CHA = 5;
const CONFIRM = 6;
const DONE = 7;

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
        const methodButtonRow = new ActionRowBuilder()
            .addComponents([
                buttonStandard, buttonPointBuy, buttonManual, buttonRoll
            ]);
            
        scores = [15, 14, 13, 12, 10, 8];
        inputScores = [0, 0, 0, 0, 0, 0];
        
        strMenu = new SelectMenuBuilder()
        .setCustomId(`nRstrMenu`)
        .setPlaceholder('STRENGTH')
        .setMinValues(1)
        .setMaxValues(1)
        strMenu = populateOptions(strMenu, scores);

        dexMenu = new SelectMenuBuilder()
        .setCustomId(`nRdexMenu`)
        .setPlaceholder('DEXTERITY')
        .setMinValues(1)
        .setMaxValues(1);

        conMenu = new SelectMenuBuilder()
        .setCustomId(`nRconMenu`)
        .setPlaceholder('CONSTITUTION')
        .setMinValues(1)
        .setMaxValues(1);

        intMenu = new SelectMenuBuilder()
        .setCustomId(`nRintMenu`)
        .setPlaceholder('INTELLIGENCE')
        .setMinValues(1)
        .setMaxValues(1);

        wisMenu = new SelectMenuBuilder()
        .setCustomId(`nRwisMenu`)
        .setPlaceholder('WISDOM')
        .setMinValues(1)
        .setMaxValues(1);

        chaMenu = new SelectMenuBuilder()
        .setCustomId(`nRchaMenu`)
        .setPlaceholder('CHARISMA')
        .setMinValues(1)
        .setMaxValues(1);
            
        const backButton = new ButtonBuilder()
            .setCustomId(`nRbackButton`)
            .setLabel(`Back`)
            .setStyle(ButtonStyle.Secondary);
            
        const confirmButton = new ButtonBuilder()
            .setCustomId(`nRconfirmButton`)
            .setLabel(`Confirm`)
            .setStyle(ButtonStyle.Success);
        
        const scoreInputRow = new ActionRowBuilder()
            .addComponents([
                strMenu
            ]);
        const confirmRow = new ActionRowBuilder()
            .addComponents([
                backButton
            ]);
            
        await interaction.update({
            content: `**Standard** - Assign your scores from a fixed list (15, 14, 13, 12, 10, 8).`,
            components: [
                methodButtonRow,
                scoreInputRow
            ]
        });

        state = STR; // default state
        const collector = interaction.channel.createMessageComponentCollector({ time: 300000 });

        collector.on('collect', async i => {
            switch(i.customId){
                case 'nRstrMenu':
                    inputScores[STR] = i.values[0];
                    scores = removeByValue(scores, inputScores[STR]);
                    
                    state = DEX;
                    dexMenu = populateOptions(dexMenu, scores);
                    scoreInputRow.setComponents([dexMenu]);
                    
                    await i.update({
                        content: `Strength set to ${inputScores[STR]}`,
                        components: [
                            scoreInputRow,
                            confirmRow
                        ]
                    });
                    break;
                case 'nRdexMenu':
                    inputScores[DEX] = i.values[0];
                    scores = removeByValue(scores, inputScores[DEX]);
                    
                    state = CON;
                    conMenu = populateOptions(conMenu, scores);
                    scoreInputRow.setComponents([conMenu]);
                    
                    await i.update({
                        content: `Dexterity set to ${inputScores[DEX]}`,
                        components: [
                            scoreInputRow,
                            confirmRow
                        ]
                    });
                    break;
                case 'nRconMenu':
                    state = CON;
                    inputScores[CON] = i.values[0];
                    scores = removeByValue(scores, inputScores[CON]);
                    
                    intMenu = populateOptions(intMenu, scores);
                    scoreInputRow.setComponents([intMenu]);
                    
                    await i.update({
                        content: `Constitution set to ${inputScores[CON]}`,
                        components: [
                            scoreInputRow,
                            confirmRow
                        ]
                    });
                    break;
                case 'nRintMenu':
                    inputScores[INT] = i.values[0];
                    scores = removeByValue(scores, inputScores[INT]);
                    
                    state = WIS;
                    wisMenu = populateOptions(wisMenu, scores);
                    scoreInputRow.setComponents([wisMenu]);
                    
                    await i.update({
                        content: `Intelligence set to ${inputScores[INT]}`,
                        components: [
                            scoreInputRow,
                            confirmRow
                        ]
                    });
                    break;
                case 'nRwisMenu':
                    inputScores[WIS] = i.values[0];
                    scores = removeByValue(scores, inputScores[WIS]);
                    
                    state = CHA;
                    chaMenu = populateOptions(chaMenu, scores);
                    scoreInputRow.setComponents([chaMenu]);
                    
                    await i.update({
                        content: `Wisdom set to ${inputScores[WIS]}`,
                        components: [
                            scoreInputRow,
                            confirmRow
                        ]
                    });
                    break;
                case 'nRchaMenu':
                    inputScores[CHA] = i.values[0];
                    scores = removeByValue(scores, inputScores[CHA]);

                    state = CONFIRM;
                    confirmRow.addComponents(confirmButton);
                    
                    await i.update({
                        content: `Charisma set to ${inputScores[CHA]}.\n**Confirm Scores?**\nSTR: ${inputScores[STR]}\nDEX: ${inputScores[DEX]}\nCON: ${inputScores[CON]}\nINT: ${inputScores[INT]}\nWIS: ${inputScores[WIS]}\nCHA: ${inputScores[CHA]}`,
                        components: [
                            confirmRow
                        ]
                    });
                    break;
                case 'nRconfirmButton':
                    confirmRow.setComponents(backButton);
                    await i.reply({
                        content: 'Wowzers'
                    })
                    state = DONE;
                    break;
                case 'nRbackButton':
                    switch(state){
                        case DEX:
                            scores.push(inputScores[STR]);
                            scoreInputRow.setComponents([strMenu]);
                            populateOptions(strMenu, scores);
                            await i.update({
                                content: `**Standard** - Assign your scores from a fixed list (15, 14, 13, 12, 10, 8).`,
                                components: [
                                    methodButtonRow,
                                    scoreInputRow
                                ]
                            });
                            state = STR;
                            break;
                        case CON:
                            scores.push(inputScores[DEX]);
                            scoreInputRow.setComponents([dexMenu]);
                            populateOptions(dexMenu, scores);
                            await i.update({
                                content: `Dexterity (DEX) set to ${inputScores[DEX]}`,
                                components: [
                                    scoreInputRow,
                                    confirmRow
                                ]
                            });
                            state = DEX;
                            break;
                        case INT:
                            scores.push(inputScores[CON]);
                            scoreInputRow.setComponents([conMenu]);
                            populateOptions(conMenu, scores);
                            await i.update({
                                content: `Constitution (CON) set to ${inputScores[CON]}`,
                                components: [
                                    scoreInputRow,
                                    confirmRow
                                ]
                            });
                            state = CON;
                            break;
                        case WIS:
                            scores.push(inputScores[INT]);
                            scoreInputRow.setComponents([intMenu]);
                            populateOptions(intMenu, scores);
                            await i.update({
                                content: `Intelligence (INT) set to ${inputScores[INT]}`,
                                components: [
                                    scoreInputRow,
                                    confirmRow
                                ]
                            });
                            state = INT
                            break;
                        case CHA:
                            scores.push(inputScores[WIS]);
                            scoreInputRow.setComponents([wisMenu]);
                            populateOptions(wisMenu, scores);
                            await i.update({
                                content: `Wisdom (WIS) set to ${inputScores[WIS]}`,
                                components: [
                                    scoreInputRow,
                                    confirmRow
                                ]
                            });
                            state = WIS;
                            break;
                        case CONFIRM:
                            scores.push(inputScores[CHA]);
                            // scoreInputRow.setComponents([chaMenu]);
                            populateOptions(chaMenu, scores);
                            confirmRow.setComponents(backButton);
                            await i.update({
                                content: `Charisma (CHA) set to ${inputScores[CHA]}`,
                                components: [
                                    scoreInputRow,
                                    confirmRow
                                ]
                            });
                            state = CHA;
                            break;
                        default:
                    }
                    break;
                default:
                    console.log(`Unknown interaction: ${i.customId}`);
            }
        });

        collector.on('end', collected => {
            console.log(`Statroll test timed out. ${collected.size} interactions collected.`);
            if(state != DONE){
                interaction.update({
                    content: `Interaction timed out. Please try again.`
                });
            }
        });
    }
}