const Scroll = require('../../schemas/scroll')
const { SlashCommandBuilder } = require('discord.js');
const Tools = require('../../functions/tools/tools.js')
const mongoose = require('mongoose');
const { addScroll } = require('../../functions/tools/tools.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('refreshscrolls')
        .setDescription('Refreshes available scroll items.'),
    
    async execute(interaction, client) {
        await Scroll.collection.drop(); // deletes all scrolls in the table

        // addSpell(name, level, spellClass, castingTime, components, description, school, savingThrowDC, saveThrowType, damage, range, duration)
        await addSpell(1, 13, 5, 0);
        console.log(`Cantrip spell loaded.`);
        

        await interaction.reply({
            content: `Spells reloaded.`,
            ephemeral: true
        });

    }
}