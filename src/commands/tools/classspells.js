const Spell = require('../../schemas/spell');
const { formatSlug, getLevelSuffix } = require('../../functions/tools/tools.js');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const mongoose = require('mongoose');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('classspells')
        .setDescription('Retrieve all spells for a given class.')
        .addStringOption(option => 
            option
                .setName('class')
                .setDescription('Class you want to look up spells for')
                .setRequired(true)
                .addChoices(
                    { name: 'Barbarian', value: 'Barbarian'},
                    { name: 'Bard', value: 'Bard'},
                    { name: 'Cleric', value: 'Cleric'},
                    { name: 'Druid', value: 'Druid'},
                    { name: 'Fighter', value: 'Fighter'},
                    { name: 'Monk', value: 'Monk'},
                    { name: 'Paladin', value: 'Paladin'},
                    { name: 'Ranger', value: 'Ranger'},
                    { name: 'Rogue', value: 'Rogue'},
                    { name: 'Sorcerer', value: 'Sorcerer'},
                    { name: 'Warlock', value: 'Warlock'},
                    { name: 'Wizard', value: 'Wizard'}
                )
        )
        .addNumberOption(option => 
            option
                .setName('level')
                .setDescription('Level of spells you want to look up')
                .setRequired(false)
                .addChoices(
                    { name: 'Cantrip', value: 0},
                    { name: '1st', value: 1},
                    { name: '2nd', value: 2},
                    { name: '3rd', value: 3},
                    { name: '4th', value: 4},
                    { name: '5th', value: 5},
                    { name: '6th', value: 6},
                    { name: '7th', value: 7},
                    { name: '8th', value: 8},
                    { name: '9th', value: 9}
                )
        ),
    async execute(interaction, client) {
        const playerClass = interaction.options.getString('class');
        const spellLevel = interaction.options.getNumber('level');
        var cursor;
        if(spellLevel){
            cursor = Spell.find({ spellClass: playerClass, level: spellLevel }).cursor();
        } else {
            cursor = Spell.find({ spellClass: playerClass }).cursor();
        }
        if(cursor){
            outputString = `**${playerClass} Spells**\n\n`
            spellsFound = [];
            for(let spell = await cursor.next(); spell != null; spell = await cursor.next()){
                console.log(spell.name);
                spellsFound += { name: spell.name, level: spell.level };
                outputString += `*${spell.name}* (${getLevelSuffix(spell.level)} Spell)\n`
            }
            await interaction.reply({
                content: outputString,
                ephemeral: true
            });
        } else{
            await interaction.reply({
                content: `No spells found for that class.`,
                ephemeral: true
            })
        }
        
    }
}