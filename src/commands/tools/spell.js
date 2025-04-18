const Character = require("../../schemas/character");
const Spell = require("../../schemas/spell");
const { formatSlug } = require("../../functions/tools/tools.js");
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const mongoose = require("mongoose");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("spell")
    .setDescription("Look up spell information.")
    .addStringOption((option) =>
      option
        .setName("name")
        .setDescription("Name of the weapon to add")
        .setAutocomplete(true)
        .setRequired(true)
    ),
  async autocomplete(interaction, client) {
    const focusedValue = formatSlug(interaction.options.getFocused());
    choices = [];
    const cursor = await Spell.find().cursor();
    for (
      let spell = await cursor.next();
      spell != null;
      spell = await cursor.next()
    ) {
      await choices.push(spell.name);
    }
    //console.log(choices);
    const filtered = choices.filter((choice) =>
      formatSlug(choice).includes(focusedValue)
    );
    if (filtered.length > 20) {
      do {
        filtered.pop();
      } while (filtered.length > 20);
    }
    await interaction.respond(
      filtered.map((choice) => ({ name: choice, value: choice }))
    );
  },
  async execute(interaction, client) {
    const slug = formatSlug(interaction.options.getString("name"));
    choices = [];
    const cursor = await Spell.find().cursor();
    for (
      let spell = await cursor.next();
      spell != null;
      spell = await cursor.next()
    ) {
      await choices.push(spell.slug);
    }
    //console.log(choices);
    //console.log(`Curslug: ${slug}`);

    if (!choices.includes(slug)) {
      await interaction.reply({ content: "Invalid spell.", ephemeral: true });
    } else {
      try {
        spell = await Spell.findOne({ slug: slug });
        range = spell.range;
        castingTime = spell.castingTime;
        components = spell.components;
        duration = spell.duration;
        school = spell.school;
        level = `${spell.level}`;
        subheader = ``;
        if (level == "0") {
          subheader = `${school} Cantrip`;
        } else {
          if (level == "1") level = "1st";
          else if (level == "2") level = "2nd";
          else if (level == "3") level = "3rd";
          else level += "th";
          subheader = `${level} level ${school} spell`;
        }

        spellClasses = ``;
        for (i = 0; i < spell.spellClass.length; i++) {
          spellClasses += `${spell.spellClass[i]}`;
          if (i != spell.spellClass.length - 1) spellClasses += `, `;
        }

        description = spell.description;

        var color;
        if (school.includes("Abjuration")) {
          color = 0xe1dc75;
        } // gold
        else if (school.includes("Conjuration")) {
          color = 0x43d667;
        } // green
        else if (school.includes("Divination")) {
          color = 0xffffff;
        } // white
        else if (school.includes("Enchantment")) {
          color = 0xa0d9d9;
        } // silver/teal
        else if (school.includes("Evocation")) {
          color = 0xea0029;
        } // red
        else if (school.includes("Illusion")) {
          color = 0xff00f7;
        } // purple
        else if (school.includes("Necromancy")) {
          color = 0x000000;
        } // black
        else if (school.includes("Transmutation")) {
          color = 0x0033ff;
        } // blue
        else {
          color = 0xff7502;
        }

        const embed = new EmbedBuilder()
          .setTitle(`${spell.name}`)
          .setDescription(
            `**${subheader}**\n\n**Casting Time:** ${castingTime}\n**Range/Area:** ${range}\n**Components:** ${components}\n**Duration:** ${duration}\n**Class(es):** ${spellClasses}`
          )
          .setColor(color);
        //.setThumbnail(interaction.user.displayAvatarURL())

        if (description.length > 1024) {
          descriptionOutput = description.split(/\n\s*\n/g);
          embed.addFields([
            {
              name: `Description`,
              value: `${descriptionOutput[0]}`,
            },
          ]);
          for (i = 1; i < descriptionOutput.length; i++) {
            embed.addFields([
              {
                name: `\u200B`,
                value: `${descriptionOutput[i]}`,
              },
            ]);
          }
        } else {
          embed.addFields([
            {
              name: `Description`,
              value: `${description}`,
            },
          ]);
        }
        await interaction.reply({
          embeds: [embed],
        });
      } catch (error) {
        console.log(error);
        await interaction.reply({
          content: "Unable to find spell.",
          ephemeral: true,
        });
      }
    }
  },
};
