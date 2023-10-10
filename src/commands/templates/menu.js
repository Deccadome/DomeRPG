const {
  SlashCommandBuilder,
  StringSelectMenuBuilder,
  ActionRowBuilder,
  StringSelectMenuOptionBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("menu")
    .setDescription("Returns a select menu"),
  async execute(interaction, client) {
    const menu = new StringSelectMenuBuilder()
      .setCustomId(`exampleMenu`)
      .setMinValues(1)
      .setMaxValues(1)
      .setOptions(
        new StringSelectMenuOptionBuilder({
          label: `Option #1`,
          value: `https://deccadome.com`,
        }),
        new StringSelectMenuOptionBuilder({
          label: `Option 2`,
          value: `https://www.deccadome.com`,
        })
      );

    await interaction.reply({
      content: "Are you sure?",
      components: [new ActionRowBuilder().addComponents(menu)],
    });
  },
};
