const Character = require('../../schemas/character');
const { SlashCommandBuilder } = require('discord.js');
const mongoose = require('mongoose');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('activecharacter')
        .setDescription('Shows your currently active character.'),
    async execute(interaction, client) {
        const curActive = await Character.findOne({ userId: interaction.user.id, active: true });
        console.log(curActive);
        if(!curActive){ 
            await interaction.reply({
                content: `You don't currently have a primary character.`,
                ephemeral: true
            });
        }
        else{
            await interaction.reply({
                content: `**${curActive.displayName}** is your current primary character.`,
                ephemeral: true
            });
        }
    }
}