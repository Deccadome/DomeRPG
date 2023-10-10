const Spell = require("../../schemas/spell");
const {
  formatSlug,
  getLevelSuffix,
} = require("../../functions/tools/tools.js");
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const mongoose = require("mongoose");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("classspells")
    .setDescription("Retrieve all spells for a given class.")
    .addStringOption((option) =>
      option
        .setName("class")
        .setDescription("Class you want to look up spells for")
        .setRequired(true)
        .addChoices(
          { name: "Barbarian", value: "Barbarian" },
          { name: "Bard", value: "Bard" },
          { name: "Cleric", value: "Cleric" },
          { name: "Druid", value: "Druid" },
          { name: "Fighter", value: "Fighter" },
          { name: "Monk", value: "Monk" },
          { name: "Paladin", value: "Paladin" },
          { name: "Ranger", value: "Ranger" },
          { name: "Rogue", value: "Rogue" },
          { name: "Sorcerer", value: "Sorcerer" },
          { name: "Warlock", value: "Warlock" },
          { name: "Wizard", value: "Wizard" }
        )
    )
    .addNumberOption((option) =>
      option
        .setName("level")
        .setDescription("Level of spells you want to look up")
        .setRequired(false)
        .addChoices(
          { name: "Cantrip", value: 0 },
          { name: "1st", value: 1 },
          { name: "2nd", value: 2 },
          { name: "3rd", value: 3 },
          { name: "4th", value: 4 },
          { name: "5th", value: 5 },
          { name: "6th", value: 6 },
          { name: "7th", value: 7 },
          { name: "8th", value: 8 },
          { name: "9th", value: 9 }
        )
    ),
  async execute(interaction, client) {
    const inputClass = interaction.options.getString("class");
    const embed = new EmbedBuilder().setTitle(`${inputClass} Spells`);
    spellLevel = -1;
    if (interaction.options.getNumber("level") !== null) {
      spellLevel = interaction.options.getNumber("level");
    }
    var cursor;
    if (spellLevel != -1) {
      cursor = Spell.find({
        spellClass: inputClass,
        level: spellLevel,
      }).cursor();
    } else {
      cursor = Spell.find({ spellClass: inputClass }).cursor();
    }
    console.log(cursor.constructor.name);
    outputString = `**${inputClass} Spells**\n\n`;
    spellsFound = [[], [], [], [], [], [], [], [], [], []];
    let spell = await cursor.next();
    if (spell != null) {
      while (spell != null) {
        console.log(spell.name);
        spellsFound[spell.level].push(spell.name);
        spell = await cursor.next();
      }
      for (i = 0; i < spellsFound.length; i++) {
        if (spellsFound[i][0]) {
          fieldName = getLevelSuffix(i);
          if (fieldName != `Cantrip`) fieldName += ` Spells`;
          else fieldName += `s`;
          embed.addFields([
            {
              name: `${fieldName}`,
              value: `${spellsFound[i].join(`\n`)}`,
            },
          ]);
        }
      }
      await interaction.reply({
        embeds: [embed],
      });
    } else {
      await interaction.reply({
        content: `No spells found for that class/level.`,
        ephemeral: true,
      });
    }
  },
};
