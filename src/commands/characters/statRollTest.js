const Character = require("../../schemas/character");
const Tools = require("../../functions/tools/tools.js");
const {
  SlashCommandBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
const mongoose = require("mongoose");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("statrolltest")
    .setDescription("Test different stat rolling methods."),
  async execute(interaction, client) {
    const buttonStandard = new ButtonBuilder()
      .setCustomId(`standardButton`)
      .setLabel(`Standard`)
      .setStyle(ButtonStyle.Primary);
    const buttonPointBuy = new ButtonBuilder()
      .setCustomId(`pointBuyButton`)
      .setLabel(`Point Buy`)
      .setStyle(ButtonStyle.Primary);
    const buttonManual = new ButtonBuilder()
      .setCustomId(`manualButton`)
      .setLabel(`Manual`)
      .setStyle(ButtonStyle.Primary);
    const buttonRoll = new ButtonBuilder()
      .setCustomId(`rollButton`)
      .setLabel(`Roll`)
      .setStyle(ButtonStyle.Primary);
    const buttonRow = new ActionRowBuilder().addComponents([
      buttonStandard,
      buttonPointBuy,
      buttonManual,
      buttonRoll,
    ]);
    await interaction.reply({
      content: `**Choose your Ability Score generation method.**`,
      components: [buttonRow],
    });
  },
};
