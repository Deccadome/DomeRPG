const { InteractionType } = require("discord.js");

module.exports = {
  name: "interactionCreate",
  async execute(interaction, client) {
    if (interaction.isChatInputCommand()) {
      const { commands } = client;
      const { commandName } = interaction;
      const command = commands.get(commandName);
      if (!command) return;
      try {
        await command.execute(interaction, client);
      } catch (error) {
        console.error(error);
        await interaction.reply({
          content: `Something went wrong executing this command...`,
          ephemeral: true,
        });
      }
    } else if (interaction.isButton() && !interaction.customId.includes(`nR`)) {
      const { buttons } = client;
      const { customId } = interaction;
      const button = buttons.get(customId);
      if (!button) return new Error("No existing code for this button.");

      try {
        await button.execute(interaction, client);
      } catch (error) {
        console.error(error);
      }
    } else if (
      interaction.isStringSelectMenu() &&
      !interaction.customId.includes(`nR`)
    ) {
      const { selectMenus } = client;
      const { customId } = interaction;
      const menu = selectMenus.get(customId);
      if (!menu) return new Error("No existing code for this select menu.");
      try {
        await menu.execute(interaction, client);
      } catch (error) {
        console.error(error);
      }
    } else if (
      interaction.type == InteractionType.ModalSubmit &&
      !interaction.customId.includes(`nR`)
    ) {
      const { modals } = client;
      const { customId } = interaction;
      const modal = modals.get(customId);
      if (!modal) return new Error("No existing code for this modal.");
      try {
        await modal.execute(interaction, client);
      } catch (error) {
        console.error(error);
      }
    } else if (interaction.isContextMenuCommand()) {
      const { commands } = client;
      const { commandName } = interaction;
      const contextCommand = commands.get(commandName);
      if (!contextCommand)
        return new Error("No existing code for this context command.");
      try {
        await contextCommand.execute(interaction, client);
      } catch (error) {
        console.error(error);
      }
    } else if (
      interaction.type == InteractionType.ApplicationCommandAutocomplete
    ) {
      const { commands } = client;
      const { commandName } = interaction;
      const command = commands.get(commandName);
      if (!command) return;
      try {
        await command.autocomplete(interaction, client);
      } catch (error) {
        console.error(error);
      }
    }
  },
};
