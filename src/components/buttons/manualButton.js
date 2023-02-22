// Manual input for Ability Scores
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
  data: {
    name: `manualButton`,
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
      .setStyle(ButtonStyle.Primary)
      .setDisabled(true);
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

    const startButton = new ButtonBuilder()
      .setCustomId(`nRstartButton`)
      .setLabel(`Input Scores`)
      .setStyle(ButtonStyle.Success);
    const buttonRow2 = new ActionRowBuilder().addComponents([startButton]);

    exit = false;

    await interaction.update({
      content: `**Manual** - Manually input and assign your scores.`,
      components: [buttonRow, buttonRow2],
    });

    const collector = interaction.channel.createMessageComponentCollector({
      time: 300000,
    });

    collector.on("collect", async (i) => {
      if (i.user.id !== interaction.user.id) return;
      switch (i.customId) {
        default:
      }
    });

    collector.on("end", (collected) => {
      if (!exit) {
        interaction.deleteReply();
        interaction.channel.send(
          `<@${interaction.user.id}> Interaction timed out. Please try again.`
        );
        console.log(`Manual stat collector timed out.`);
      } else console.log(`Manual stat collector stopping.`);
    });
  },
};
