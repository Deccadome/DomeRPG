// Point Buy assignment for Ability Scores
const { ActionRowBuilder, SelectMenuBuilder, SelectMenuOptionBuilder, ButtonBuilder, ButtonStyle, ConnectionService } = require('discord.js');

const INIT = 0;
const START = 1;
const DONE = 2;
const BREAK = 3;

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
        const strDec = new ButtonBuilder()
            .setCustomId(`nRstrDec`)
            .setLabel(`STR-1 (+1 pt)`)
            .setStyle(ButtonStyle.Danger)
            .setDisabled(true);
        const strInc = new ButtonBuilder()
            .setCustomId(`nRstrInc`)
            .setLabel(`STR+1 (-1 pt)`)
            .setStyle(ButtonStyle.Success)
            .setDisabled(false);
        const dexDec = new ButtonBuilder()
            .setCustomId(`nRdexDec`)
            .setLabel(`DEX-1 (+1 pt)`)
            .setStyle(ButtonStyle.Danger)
            .setDisabled(true);
        const dexInc = new ButtonBuilder()
            .setCustomId(`nRdexInc`)
            .setLabel(`DEX+1 (-1 pt)`)
            .setStyle(ButtonStyle.Success)
            .setDisabled(false);  
        const conDec = new ButtonBuilder()
            .setCustomId(`nRconDec`)
            .setLabel(`CON-1 (+1 pt)`)
            .setStyle(ButtonStyle.Danger)
            .setDisabled(true);
        const conInc = new ButtonBuilder()
            .setCustomId(`nRconInc`)
            .setLabel(`CON+1 (-1 pt)`)
            .setStyle(ButtonStyle.Success)
            .setDisabled(false);
        const intDec = new ButtonBuilder()
            .setCustomId(`nRintDec`)
            .setLabel(`INT-1 (+1 pt)`)
            .setStyle(ButtonStyle.Danger)
            .setDisabled(true);
        const intInc = new ButtonBuilder()
            .setCustomId(`nRintInc`)
            .setLabel(`INT+1 (-1 pt)`)
            .setStyle(ButtonStyle.Success)
            .setDisabled(false);  
        const wisDec = new ButtonBuilder()
            .setCustomId(`nRwisDec`)
            .setLabel(`WIS-1 (+1 pt)`)
            .setStyle(ButtonStyle.Danger)
            .setDisabled(true);
        const wisInc = new ButtonBuilder()
            .setCustomId(`nRwisInc`)
            .setLabel(`WIS+1 (-1 pt)`)
            .setStyle(ButtonStyle.Success)
            .setDisabled(false);  
        const chaDec = new ButtonBuilder()
            .setCustomId(`nRchaDec`)
            .setLabel(`CHA-1 (+1 pt)`)
            .setStyle(ButtonStyle.Danger)
            .setDisabled(true);
        const chaInc = new ButtonBuilder()
            .setCustomId(`nRchaInc`)
            .setLabel(`CHA+1 (-1 pt)`)
            .setStyle(ButtonStyle.Success)
            .setDisabled(false);
        const confirmButton = new ButtonBuilder()
            .setCustomId(`nRconfirmButton`)
            .setLabel(`Confirm`)
            .setStyle(ButtonStyle.Success);
        const statRow1 = new ActionRowBuilder()
            .addComponents([
                strDec, strInc, dexDec, dexInc
            ]);
        const statRow2 = new ActionRowBuilder()
            .addComponents([
                conDec, conInc, intDec, intInc
            ]);
        const statRow3 = new ActionRowBuilder()
            .addComponents([
                wisDec, wisInc, chaDec, chaInc
            ]);
        const confirmRow = new ActionRowBuilder()
            .addComponents([
                confirmButton
            ]);
        
        state = INIT;

        pointsRemaining = 27;
        str = 8;
        dex = 8;
        con = 8;
        int = 8;
        wis = 8;
        cha = 8;

        await interaction.update({ 
            content: `**Point Buy** - Spend up to 27 points on Ability Scores\n\nPoints Remaining: ${pointsRemaining}\nStrength: ${str}\nDexterity: ${dex}\nConstitution ${con}\nIntelligence: ${int}\nWisdom: ${wis}\nCharisma: ${cha}`,
            components: [buttonRow, statRow1, statRow2, statRow3, confirmRow]
        });
        
        state = START;
        
        const collector = interaction.channel.createMessageComponentCollector({ time: 300000 });
        
        collector.on('collect', async i => {
            if(i.user.id !== interaction.user.id) return;
            switch(i.customId){
                case 'nRstrDec':
                    if(str >= 14) pointsRemaining += 2;
                    else pointsRemaining++;
                    str--;
                    if(str == 8) strDec.setDisabled(true);
                    else if(str == 12) strInc.setLabel(`STR+1 (-1 pt)`);
                    else if(str == 13) strDec.setLabel(`STR-1 (+1 pt)`);
                    else if(str == 14) strInc.setDisabled(false);
                    break;
                case 'nRstrInc':
                    if(str >= 13) pointsRemaining -= 2;
                    else pointsRemaining--;
                    str++;
                    if(str == 9) strDec.setDisabled(false);
                    else if(str == 13) strInc.setLabel(`STR+1 (-2 pts)`);
                    else if(str == 14) strDec.setLabel(`STR-1 (+2 pts)`);
                    else if(str == 15) strInc.setDisabled(true);
                    break;
                case 'nRdexDec':
                    break;
                case 'nRdexInc':
                    break;
                case 'standardButton':
                case 'rollButton':
                case 'manualButton':
                    console.log(`Point buy collector stopping.`);
                    state = BREAK;
                    collector.stop();
                default:
            }
            if(pointsRemaining == 0){
                strInc.setDisabled(true);
                dexInc.setDisabled(true);
                conInc.setDisabled(true);
                intInc.setDisabled(true);
                wisInc.setDisabled(true);
                chaInc.setDisabled(true);
            }
            else if(pointsRemaining == 1){
                if(str >= 13) strInc.setDisabled(true);
                else strInc.setDisabled(false);
                if(dex >= 13) dexInc.setDisabled(true);
                else dexInc.setDisabled(false);
                if(con >= 13) conInc.setDisabled(true);
                else conInc.setDisabled(false);
                if(int >= 13) intInc.setDisabled(true);
                else intInc.setDisabled(false);
                if(wis >= 13) wisInc.setDisabled(true);
                else wisInc.setDisabled(false);
                if(cha >= 13) chaInc.setDisabled(true);
                else chaInc.setDisabled(false);
            }

            if(state != INIT && state != DONE){
                await interaction.update({ 
                    content: `**Point Buy** - Spend up to 27 points on Ability Scores\n\nPoints Remaining: ${pointsRemaining}\nStrength: ${str}\nDexterity: ${dex}\nConstitution ${con}\nIntelligence: ${int}\nWisdom: ${wis}\nCharisma: ${cha}`,
                    components: [buttonRow, statRow1, statRow2, statRow3, confirmRow]
                });
            }
        });
        
        collector.on('end', collected => {
            
        });
    }
}