const { rollDie } = require('../../functions/tools/tools.js')
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('roll')
        .setDescription('Specify type and quantity of dice to roll.')
        .addStringOption(option => 
            option
                .setName('roll')
                .setDescription('Roll in XdX format (ie. 2d20)')
                .setRequired(true)
        ),
    async execute(interaction, client) {
        const roll = interaction.options.getString('roll');
        const form = new RegExp('(^[0-9]*)+[d]+([0-9]*)');
        const regexMatch = roll.match(form);
        result = 0;
        //console.log(regexMatch);
        if(regexMatch[1] > 200){
            await interaction.reply({
                content: `What could you *possibly* need that many dice for??`
            });
        }
        else if(regexMatch[2] > 100){
            await interaction.reply({
                content: `That die doesn't exist.`
            });
        }
        else if(regexMatch && regexMatch[2]){
            result = rollDie(regexMatch[1], regexMatch[2]);
            rolls = result[1];
            await interaction.reply({
                content: `You rolled **${result[0]}** (${roll}: ${rolls.join(', ')}).` 
            });
        } else{
            await interaction.reply({
                content: `Invalid roll format "${roll}"`
            });
        }

    }
}