const Character = require("../../schemas/character");
const { SlashCommandBuilder } = require("discord.js");
const mongoose = require("mongoose");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("mycharacters")
    .setDescription("Shows all of your existing characters."),
  async execute(interaction, client) {
    const cursor = Character.find({ userId: interaction.user.id }).cursor();
    numCharacters = 0;
    returnString = ``;
    for (
      let character = await cursor.next();
      character != null;
      character = await cursor.next()
    ) {
      charName = character.displayName;
      charRace = character.race;
      charClass = character.class;
      charRace = character.race;
      charStatus = "Primary";
      if (character.active == false) charStatus = "Inactive";
      returnString += `Name: **${charName}**\nRace: ${charRace}\nClass: ${charClass}\nStatus: _${charStatus}_\n\n`;
      numCharacters++;
    }
    if (numCharacters == 0) {
      returnString += `You don't have any characters. Use /newcharacter to add one!`;
    } else if (numCharacters == 1) {
      returnString = `${numCharacters} character found.\n\n` + returnString;
    } else {
      returnString = `${numCharacters} characters found.\n\n` + returnString;
    }

    await interaction.reply({
      content: returnString,
      ephemeral: true,
    });
  },
};
