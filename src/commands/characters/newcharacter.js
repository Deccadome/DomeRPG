const Character = require("../../schemas/character");
const Tools = require("../../functions/tools/tools.js");
const { SlashCommandBuilder } = require("discord.js");
const mongoose = require("mongoose");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("newcharacter")
    .setDescription("Adds a new character.")
    .addStringOption((option) =>
      option
        .setName("name")
        .setDescription("Name of the new character")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("race")
        .setDescription(`Character's race`)
        .setRequired(true)
        .addChoices(
          { name: "Aarakocra", value: "Aarakocra" },
          { name: "Centaur", value: "Centaur" },
          { name: "Dragonborn", value: "Dragonborn" },
          { name: "Dwarf (Hill)", value: "Dwarf (Hill)" },
          { name: "Dwarf (Mountain)", value: "Dwarf (Mountain)" },
          { name: "Elf (High)", value: "Elf (High)" },
          { name: "Elf (Wood)", value: "Elf (Wood)" },
          { name: "Elf (Eladrin)", value: "Elf (Eladrin)" },
          { name: "Genasi (Air)", value: "Genasi (Air)" },
          { name: "Genasi (Earth)", value: "Genasi (Earth)" },
          { name: "Genasi (Fire)", value: "Genasi (Fire)" },
          { name: "Genasi (Water)", value: "Genasi (Water)" },
          { name: "Gnome (Rock)", value: "Gnome (Rock)" },
          { name: "Gnome (Deep)", value: "Gnome (Deep)" },
          { name: "Goblin", value: "Goblin" },
          { name: "Goliath", value: "Goliath" },
          { name: "Half-Elf", value: "Half-Elf" },
          { name: "Half-Orc", value: "Half-Orc" },
          { name: "Halfling (Lightfoot)", value: "Halfling (Lightfoot)" },
          { name: "Halfling (Stout)", value: "Halfling (Stout)" },
          { name: "Human", value: "Human" },
          { name: "Human (Variant)", value: "Human (Variant)" },
          { name: "Loxodon", value: "Loxodon" },
          { name: "Minotaur", value: "Minotaur" },
          //{ name: 'Simic Hybrid', value: 'Simic Hybrid'},
          { name: "Tiefling", value: "Tiefling" }
          //{ name: 'Variant Aasimar', value: 'Variant Aasimar'},
          //{ name: 'Vedalken', value: 'Vedalken'}
        )
    )
    .addStringOption((option) =>
      option
        .setName("class")
        .setDescription(`Character's class`)
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
    ),
  async execute(interaction, client) {
    const name = interaction.options.getString("name");
    const slug = Tools.formatSlug(name);
    const charRace = interaction.options.getString("race");
    const charClass = interaction.options.getString("class");
    let characterProfile = await Character.findOne({
      userId: interaction.user.id,
      charSlug: slug,
    });
    if (!characterProfile) {
      const activeChar = await Character.findOne({
        userId: interaction.user.id,
        active: true,
      });
      if (activeChar) {
        activeChar.active = false;
        await activeChar.save().catch(console.error);
      }

      characterProfile = await new Character({
        _id: mongoose.Types.ObjectId(),
        userId: interaction.user.id,
        displayName: name,
        charSlug: slug,
        race: charRace,
        class: charClass,
        active: true,
      });

      await characterProfile.save().catch(console.error);
      await interaction.reply({
        content: `New character **${characterProfile.displayName}** created and set as your *primary* character.`,
        ephemeral: true,
      });

      //console.log(characterProfile);
    } else {
      await interaction.reply({
        content: `You already have a character with the name **${characterProfile.name}**`,
        ephemeral: true,
      });
      //console.log(characterProfile);
    }
  },
};
