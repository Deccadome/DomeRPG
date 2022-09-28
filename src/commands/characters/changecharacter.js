const Character = require('../../schemas/character');
const Tools = require('../../functions/tools/tools.js');
const { SlashCommandBuilder } = require('discord.js');
const mongoose = require('mongoose');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('changecharacter')
        .setDescription('Changes your *Primary* character.')
        .addStringOption(option => 
            option
                .setName('name')
                .setDescription('Name of the character you want to switch to')
                .setAutocomplete(true)
                .setRequired(true)
        ),

    async autocomplete(interaction, client){
        const focusedValue = Tools.formatSlug(interaction.options.getFocused());
        choices = [];
        const cursor = await Character.find({ userId: interaction.user.id }).cursor();
        for(let character = await cursor.next(); character != null; character = await cursor.next()){
            await choices.push(character.displayName);
        }
        const filtered = choices.filter((choice) => 
            Tools.formatSlug(choice).startsWith(focusedValue)
        );
        await interaction.respond(
            filtered.map((choice) => ({ name: choice, value: choice }))
        );
    },

    async execute(interaction, client) {
        const option = interaction.options.getString('name');
        const optionSlug = Tools.formatSlug(option);
        choices = [];
        const cursor = await Character.find({ userId: interaction.user.id }).cursor();
        for(let character = await cursor.next(); character != null; character = await cursor.next()){
            choices.push(character.charSlug);
        }
        if(choices.includes(optionSlug)){
            const newActive = await Character.findOne({ userId: interaction.user.id, charSlug: optionSlug });
            if(newActive.active == true){
                await interaction.reply({
                    content: `**${newActive.displayName}** is already your primary character.`,
                    ephemeral: true
                });
            } else {
                const curActive = await Character.findOne({ userId: interaction.user.id, active: true });
                if(curActive){
                    curActive.active = false;
                    curActive.save().catch(console.error);
                }
                newActive.active = true;
                newActive.save().catch(console.error);
                await interaction.reply({ 
                    content: `**${newActive.displayName}** was set as your primary character.`,
                    ephemeral: true
                });
            }
        } else{
            await interaction.reply({ 
                content: `You do not have a character with that name.`,
                ephemeral: true
            });
        }
    },
}