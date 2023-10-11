// To use these functions in another file, make sure to add:
// const CharTools = require('relative/path/to/tools/charTools.js')
//
// Usage would then be CharTools.functionName();
const { StringSelectMenuOptionBuilder } = require("discord.js");
const Character = require("../../schemas/character");
const mongoose = require("mongoose");

module.exports = {
  populateOptions: function (menu, values) {
    menu.setOptions();
    addedValues = [];
    //console.log(`Values: ${values}`);
    for (i = 0; i < values.length; i++) {
      if (!addedValues.includes(values[i])) {
        menu.addOptions(
          new StringSelectMenuOptionBuilder({
            label: `${values[i]}`,
            value: `${values[i]}`,
          })
        );
      }

      addedValues.push(values[i]);
    }
    return menu;
  },

  getModifier: function (score) {
    modifiers = {
      1: -5,
      2: -4,
      3: -4,
      4: -3,
      5: -3,
      6: -2,
      7: -2,
      8: -1,
      9: -1,
      10: 0,
      11: 0,
      12: 1,
      13: 1,
      14: 2,
      15: 2,
      16: 3,
      17: 3,
      18: 4,
      19: 4,
      20: 5,
    };
    modifier = modifiers[score];
    if (modifier >= 0) {
      return `+${modifier}`;
    } else {
      return modifier;
    }
  },

  async getStats(userId) {
    char = await Character.findOne({ userId: userId, active: true });
    return `STR: ${char.strength}\nDEX: ${char.dexterity}\nCON: ${char.constitution}\nINT: ${char.intelligence}\nWIS: ${char.wisdom}\nCHA: ${char.charisma}\n`;
  },
};
