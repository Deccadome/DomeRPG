const Character = require('../../schemas/character');
const Tools = require('../../functions/tools/tools.js');
const { SlashCommandBuilder, SelectMenuBuilder, ActionRowBuilder, SelectMenuOptionBuilder, ComponentType, messageLink } = require('discord.js');
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
        const optionSlug = Tools.formatSlug(interaction.options.getString('name'));
        choices = [];
        const cursor = await Character.find({ userId: interaction.user.id }).cursor();
        for(let character = await cursor.next(); character != null; character = await cursor.next()){
            choices.push(character.charSlug);
        }
        //console.log(option);
        //console.log(optionSlug);
        if(!choices.length){
            await interaction.reply({ content: `You don't have any characters.`});
        }
        else if(choices.includes(optionSlug)){
            const menu = new SelectMenuBuilder()
            .setCustomId(`deleteCharacterConfirm`)
            .setMinValues(1)
            .setMaxValues(1)
            .setOptions(
                new SelectMenuOptionBuilder({
                    label: 'Yes',
                    value: option
            }), new SelectMenuOptionBuilder({
                    label: 'No',
                    value: 'no'
            }));

            await interaction.reply({
                content: `Are you sure you want to delete **${option}**?`,
                components: [new ActionRowBuilder().addComponents(menu)],
                ephemeral: true
            });
            
        } else{
            await interaction.reply({ content: `You don't have a character with that name.`});
        }
    },
}