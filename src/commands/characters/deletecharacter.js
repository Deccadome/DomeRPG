const Player = require('../../schemas/player');
const { SlashCommandBuilder } = require('discord.js');
const mongoose = require('mongoose');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('deletecharacter')
        .setDescription('Removes one of your specified characters.')
        .addStringOption(option => 
            option
                .setName('name')
                .setDescription('Name of the character you want to switch to')
                .setAutocomplete(true)
                .setRequired(true)
        ),
    async autocomplete(interaction, client){
        const focusedValue = interaction.options.getFocused();
        choices = [];
        const cursor = await Player.find({ userId: interaction.user.id }).cursor();
        for(let character = await cursor.next(); character != null; character = await cursor.next()){
            await choices.push(character.characterName);
        }
        const filtered = choices.filter((choice) => 
            choice.toLowerCase().startsWith(focusedValue)
        );
        await interaction.respond(
            filtered.map((choice) => ({ name: choice, value: choice }))
        );

    },
    async execute(interaction, client) {
        const option = interaction.options.getString('name');
        choices = [];
        const cursor = await Player.find({ userId: interaction.user.id }).cursor();
        for(let character = await cursor.next(); character != null; character = await cursor.next()){
            choices.push(character.characterLower);
        }
        if(!choices.length){
            await interaction.reply({ content: `You don't have any characters.`});
        }
        else if(choices.includes(option.toLowerCase())){
            try {
                await Player.findOneAndDelete({ userId: interaction.user.id, characterLower: option.toLowerCase() });
                await interaction.reply({ content: `Character ${option} successfully deleted.`})
            } catch (error) {
                await interaction.reply({ content: `Unable to delete ${option}.`});
                console.error(error);
            }
            
        } else{
            await interaction.reply({ content: `You don't have a character with that name.`});
        }
    },
}