const Scroll = require("../../schemas/scroll");
const { SlashCommandBuilder } = require("discord.js");
const mongoose = require("mongoose");
const { addScroll } = require("../../functions/tools/tools.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("refreshscrolls")
    .setDescription("Refreshes available scroll items."),

  async execute(interaction, client) {
    await Scroll.collection.drop(); // deletes all scrolls in the table

    // addScroll(level, savingThrowDC, attackBonus, underLevelCastDC)
    addScroll(0, 13, 5, 0);
    console.log(`Cantrip scroll loaded.`);
    addScroll(1, 13, 5, 11);
    console.log(`1st level scroll loaded.`);
    addScroll(2, 13, 5, 12);
    console.log(`2nd level scroll loaded.`);
    addScroll(3, 15, 7, 13);
    console.log(`3rd level scroll loaded.`);
    addScroll(4, 15, 7, 14);
    console.log(`4th level scroll loaded.`);
    addScroll(5, 17, 9, 15);
    console.log(`5th level scroll loaded.`);
    addScroll(6, 17, 9, 16);
    console.log(`6th level scroll loaded.`);
    addScroll(7, 18, 10, 17);
    console.log(`7th level scroll loaded.`);
    addScroll(8, 18, 10, 18);
    console.log(`8th level scroll loaded.`);
    addScroll(9, 19, 11, 19);
    console.log(`9th level scroll loaded.`);

    await interaction.reply({
      content: `Scrolls reloaded.`,
      ephemeral: true,
    });
  },
};
