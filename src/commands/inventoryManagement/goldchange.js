const Character = require('../../schemas/character');
const { SlashCommandBuilder } = require('discord.js');
const mongoose = require('mongoose');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('goldchange')
        .setDescription('Adds or removes gold to your currently active character.')
        .addNumberOption(option =>
            option.setName('amount')
                .setDescription('Amount to add or subtact (-) from your primary character.')
                .setRequired(true)
        ),
    async execute(interaction, client) {
        const curActive = await Character.findOne({ userId: interaction.user.id, active: true });
        //console.log(curActive);
        if(!curActive){ 
            await interaction.reply({
                content: `You don't currently have a primary character.`
            });
        }
        else{
            try {
                const amount = interaction.options.getNumber('amount');
                curActive.goldBalance += amount;
                await curActive.save();
                if(amount >= 0){
                    await interaction.reply({
                        content: `**${amount} gold** added to **${curActive.displayName}**.`
                    });
                }
                else{
                    await interaction.reply({
                        content: `**${amount} gold** removed from **${curActive.displayName}**.`
                    });
                }
            } catch (error) {
                console.log(error);
                await interaction.reply({ content: `Unable to modify gold balance.`, ephemeral: true });
            }
        }
    }
}