// To use these functions in another file, make sure to add:
// const CharTools = require('relative/path/to/tools/charTools.js')
//
// Usage would then be CharTools.functionName();
const { SelectMenuBuilder, SelectMenuOptionBuilder } = require('discord.js');
const Character = require('../../schemas/character');
const mongoose = require('mongoose');

module.exports = {
    populateOptions: function(menu, values){
        menu.setOptions();
        //console.log(`Values: ${values}`);
        for(i = 0; i < values.length; i++){
            menu.addOptions(new SelectMenuOptionBuilder({
                label: `${values[i]}`,
                value: `${values[i]}`
            }))
        }
        return menu;
    },

    async getStats(userId){
        char = await Character.findOne({ userId: userId, active: true });
        return `STR: ${char.strength}\nDEX: ${char.dexterity}\nCON: ${char.constitution}\nINT: ${char.intelligence}\nWIS: ${char.wisdom}\nCHA: ${char.charisma}\n`
    }
}