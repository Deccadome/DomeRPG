const Character = require('../../schemas/character');
const Tools = require('../../functions/tools/tools.js')
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
                .setName('race')
                .setDescription(`Character's race`)
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
        const slug = Tools.formatSlug(name);
        const charRace = interaction.options.getString('race');
        const charClass = interaction.options.getString('class');
        let characterProfile = await Character.findOne({ userId: interaction.user.id, charSlug: slug});
        if(!characterProfile) {
            const activeChar = await Character.findOne({ userId: interaction.user.id, active: true })
            if(activeChar){
                activeChar.active = false;
                await activeChar.save().catch(console.error);
            }

            characterProfile = await new Character({
                _id: mongoose.Types.ObjectId(),
                userId: interaction.user.id,
                displayName: name,
                charSlug: slug,
                race: charRace,
                class: charClass,
                active: true
            });

            await characterProfile.save().catch(console.error);
            await interaction.reply({
                content: `New character **${characterProfile.displayName}** created and set as your *primary* character.`,
                ephemeral: true
            });

            //console.log(characterProfile);
        } else{
            await interaction.reply({
                content: `You already have a character with the name **${characterProfile.name}**`,
                ephemeral: true
            });
            //console.log(characterProfile);
        }
    }
}