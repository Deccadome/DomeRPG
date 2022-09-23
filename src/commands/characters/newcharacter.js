const Player = require('../../schemas/player');
const { SlashCommandBuilder } = require('discord.js');
const mongoose = require('mongoose');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('newcharacter')
        .setDescription('Adds a new character.')
        .addStringOption(option => 
            option
                .setName('name')
                .setDescription('Name of the new character')
                .setRequired(true)
        )
        .addStringOption(option => 
            option
                .setName('class')
                .setDescription(`Character's class`)
                .setRequired(true)
        ),
    async execute(interaction, client) {
        const name = interaction.options.getString('name');
        const charClass = interaction.options.getString('class');
        let characterProfile = await Player.findOne({ userId: interaction.user.id, characterLower: name.toLowerCase()});
        if(!characterProfile) {
            const cursor = Player.find({ userId: interaction.user.id }).cursor();
            for(let character = await cursor.next(); character != null; character = await cursor.next()){
                character.characterActive = false;
                await character.save().catch(console.error);
            }

            characterProfile = await new Player({
                _id: mongoose.Types.ObjectId(),
                userId: interaction.user.id,
                characterName: name,
                characterLower: name.toLowerCase(),
                characterClass: charClass,
                characterActive: true
            });

            await characterProfile.save().catch(console.error);
            await interaction.reply({
                content: `New character **${characterProfile.characterName}** created and set *Active*.`
            });

            //console.log(characterProfile);
        } else{
            await interaction.reply({
                content: `You already have a character with the name **${characterProfile.characterName}**`
            });
            //console.log(characterProfile);
        }
    }
}