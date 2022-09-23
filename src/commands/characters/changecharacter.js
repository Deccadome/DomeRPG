const Player = require('../../schemas/player');
const { SlashCommandBuilder } = require('discord.js');
const mongoose = require('mongoose');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('changecharacter')
        .setDescription('Changes your Active character.')
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
        const option = interaction.options.getString('name').toLowerCase();
        choices = [];
        const cursor = await Player.find({ userId: interaction.user.id }).cursor();
        for(let character = await cursor.next(); character != null; character = await cursor.next()){
            choices.push(character.characterLower);
        }
        if(choices.includes(option)){
            const newActive = await Player.findOne({ userId: interaction.user.id, characterLower: option });
            if(newActive.characterActive == true){
                await interaction.reply({
                    content: `**${newActive.characterName}** is already your primary character.`}
                );
            } else {
                const curActive = await Player.findOne({ userId: interaction.user.id, characterActive: true });
                if(curActive){
                    curActive.characterActive = false;
                    curActive.save().catch(console.error);
                }
                newActive.characterActive = true;
                newActive.save().catch(console.error);
                await interaction.reply({ content: `**${newActive.characterName}** was set as your primary character.`});
            }
        } else{
            await interaction.reply({ content: `You do not have a character with that name.`});
        }
    },
}