// To use these functions in another file, make sure to add:
// const Tools = require('relative/path/to/tools/tools.js')
//
// Usage would then be Tools.functionName();
const { SlashCommandBuilder } = require('discord.js');
const mongoose = require('mongoose');
const Scroll = require('../../schemas/scroll');

module.exports = {
    // Format character name (or any string) to replace spaces with '-' and make all letters lowercase
    formatSlug: function(input) {
        return input.replace(/\s+/g, '-').toLowerCase();
    },

    // Adds a scroll to respective table
    async addScroll(level, dc, attackBonus, underLevelCastDC){
        scrollProfile = await new Scroll({
            _id: mongoose.Types.ObjectId(),
            level: level,
            savingThrowDC: dc,
            attackBonus: attackBonus,
            underLevelCastDC: underLevelCastDC
        });
        await scrollProfile.save().catch(console.error);
    },
}