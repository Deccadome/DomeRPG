// Automatically rolled assignment for Ability Scores
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

const { rollDie } = require("../../functions/tools/tools.js");

module.exports = {
  data: {
    name: `rollButton`,
  },
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
      .setStyle(ButtonStyle.Primary)
      .setDisabled();
    const buttonRow = new ActionRowBuilder().addComponents([
      buttonStandard,
      buttonPointBuy,
      buttonManual,
      buttonRoll,
    ]);
    const strRoll = new ButtonBuilder()
      .setCustomId(`nRstrRoll`)
      .setLabel(`STR`)
      .setStyle(ButtonStyle.Success);

    exit = false;

    await interaction.update({
      content: `**Roll** - Assign 6 randomly-generated numbers to your Ability Scores.`,
      components: [buttonRow],
    });

    const collector = interaction.channel.createMessageComponentCollector({
      time: 300000,
    });

    collector.on("collect", async (i) => {});

    collector.on("end", (collected) => {
      if (!exit) {
        interaction.deleteReply();
        interaction.channel.send(
          `<@${interaction.user.id}> Interaction timed out. Please try again.`
        );
        console.log(`Roll stat collector timed out.`);
      } else console.log(`Roll stat collector stopping.`);
    });
  },
};
