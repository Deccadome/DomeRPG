const Character = require("../../schemas/character");
const Tools = require("../../functions/tools/tools.js");
const { messageLink } = require("discord.js");

module.exports = {
  data: {
    name: `deleteCharacterConfirm`,
  },
  async execute(interaction, client) {
    confirmDel = await interaction.values[0];
    //console.log(confirmDel);
    if (confirmDel != "no") {
      option = confirmDel;
      optionSlug = Tools.formatSlug(option);
      try {
        await Character.findOneAndDelete({
          userId: interaction.user.id,
          charSlug: optionSlug,
        });
        await interaction.update({
          content: `Character **${option}** successfully deleted.`,
          components: [],
        });
      } catch (error) {
        await interaction.update({
          content: `Unable to delete ${confirmDel}.`,
          components: [],
        });
        console.error(error);
      }
    } else {
      await interaction.update({
        content: `Operation cancelled.`,
        components: [],
      });
    }
  },
};
