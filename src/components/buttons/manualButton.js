// Manual input for Ability Scores
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const Character = require("../../schemas/character");
const mongoose = require("mongoose");
const { getStats } = require("../../functions/tools/charCreationTools");

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
    const strDec = new ButtonBuilder()
      .setCustomId(`nRstrDec`)
      .setLabel(`STR-1`)
      .setStyle(ButtonStyle.Danger)
      .setDisabled(false);
    const strInc = new ButtonBuilder()
      .setCustomId(`nRstrInc`)
      .setLabel(`STR+1`)
      .setStyle(ButtonStyle.Success)
      .setDisabled(false);
    const dexDec = new ButtonBuilder()
      .setCustomId(`nRdexDec`)
      .setLabel(`DEX-1`)
      .setStyle(ButtonStyle.Danger)
      .setDisabled(false);
    const dexInc = new ButtonBuilder()
      .setCustomId(`nRdexInc`)
      .setLabel(`DEX+1`)
      .setStyle(ButtonStyle.Success)
      .setDisabled(false);
    const conDec = new ButtonBuilder()
      .setCustomId(`nRconDec`)
      .setLabel(`CON-1`)
      .setStyle(ButtonStyle.Danger)
      .setDisabled(false);
    const conInc = new ButtonBuilder()
      .setCustomId(`nRconInc`)
      .setLabel(`CON+1`)
      .setStyle(ButtonStyle.Success)
      .setDisabled(false);
    const intDec = new ButtonBuilder()
      .setCustomId(`nRintDec`)
      .setLabel(`INT-1`)
      .setStyle(ButtonStyle.Danger)
      .setDisabled(false);
    const intInc = new ButtonBuilder()
      .setCustomId(`nRintInc`)
      .setLabel(`INT+1`)
      .setStyle(ButtonStyle.Success)
      .setDisabled(false);
    const wisDec = new ButtonBuilder()
      .setCustomId(`nRwisDec`)
      .setLabel(`WIS-1`)
      .setStyle(ButtonStyle.Danger)
      .setDisabled(false);
    const wisInc = new ButtonBuilder()
      .setCustomId(`nRwisInc`)
      .setLabel(`WIS+1`)
      .setStyle(ButtonStyle.Success)
      .setDisabled(false);
    const chaDec = new ButtonBuilder()
      .setCustomId(`nRchaDec`)
      .setLabel(`CHA-1`)
      .setStyle(ButtonStyle.Danger)
      .setDisabled(false);
    const chaInc = new ButtonBuilder()
      .setCustomId(`nRchaInc`)
      .setLabel(`CHA+1`)
      .setStyle(ButtonStyle.Success)
      .setDisabled(false);
    const confirmButton = new ButtonBuilder()
      .setCustomId(`nRconfirmButton`)
      .setLabel(`Confirm`)
      .setStyle(ButtonStyle.Success);
    const statRow1 = new ActionRowBuilder().addComponents([
      strDec,
      strInc,
      dexDec,
      dexInc,
    ]);
    const statRow2 = new ActionRowBuilder().addComponents([
      conDec,
      conInc,
      intDec,
      intInc,
    ]);
    const statRow3 = new ActionRowBuilder().addComponents([
      wisDec,
      wisInc,
      chaDec,
      chaInc,
    ]);

    const confirmRow = new ActionRowBuilder().addComponents([confirmButton]);

    str = 8;
    dex = 8;
    con = 8;
    int = 8;
    wis = 8;
    cha = 8;

    exit = false;

    await interaction.update({
      content: `**Manual** - Set ability scores with no point limit.\nStrength: *${str}*\nDexterity: *${dex}*\nConstitution *${con}*\nIntelligence: *${int}*\nWisdom: *${wis}*\nCharisma: *${cha}*`,
      components: [buttonRow, statRow1, statRow2, statRow3, confirmRow],
    });

    const collector = interaction.channel.createMessageComponentCollector({
      time: 300000,
    });

    collector.on("collect", async (i) => {
      if (i.user.id !== interaction.user.id) return;
      switch (i.customId) {
        case "nRstrDec":
          str--;
          if (str == 1) strDec.setDisabled(true);
          if (str == 19) strDec.setDisabled(false);
          break;
        case "nRstrInc":
          str++;
          if (str == 20) strInc.setDisabled(true);
          if (str == 2) strInc.setDisabled(false);
          break;
        case "nRdexDec":
          dex--;
          if (dex == 1) dexDec.setDisabled(true);
          if (dex == 19) dexDec.setDisabled(false);
          break;
        case "nRdexInc":
          dex++;
          if (dex == 20) dexInc.setDisabled(true);
          if (dex == 2) dexInc.setDisabled(false);
          break;
        case "nRconDec":
          con--;
          if (con == 1) conDec.setDisabled(true);
          if (con == 19) conDec.setDisabled(false);
          break;
        case "nRconInc":
          con++;
          if (con == 20) conInc.setDisabled(true);
          if (con == 2) conInc.setDisabled(false);
          break;
        case "nRintDec":
          int--;
          if (int == 1) intDec.setDisabled(true);
          if (int == 19) intDec.setDisabled(false);
          break;
        case "nRintInc":
          int++;
          if (int == 20) intInc.setDisabled(true);
          if (int == 2) intInc.setDisabled(false);
          break;
        case "nRwisDec":
          wis--;
          if (wis == 1) wisDec.setDisabled(true);
          if (wis == 19) wisDec.setDisabled(false);
          break;
        case "nRwisInc":
          wis++;
          if (wis == 20) wisInc.setDisabled(true);
          if (wis == 2) wisInc.setDisabled(false);
          break;
        case "nRchaDec":
          cha--;
          if (cha == 1) chaDec.setDisabled(true);
          if (cha == 19) chaDec.setDisabled(false);
          break;
        case "nRchaInc":
          cha++;
          if (cha == 20) chaInc.setDisabled(true);
          if (cha == 2) chaInc.setDisabled(false);
          break;
        case "nRconfirmButton":
          activeChar = await Character.findOne({
            userId: interaction.user.id,
            active: true,
          });
          if (activeChar) {
            activeChar.strength = str;
            activeChar.dexterity = dex;
            activeChar.constitution = con;
            activeChar.intelligence = int;
            activeChar.wisdom = wis;
            activeChar.charisma = cha;
            await activeChar.save().catch(console.error);
          }
          exit = true;
          collector.stop();
          stats = await getStats(interaction.user.id);
          await i.update({
            content: `${activeChar.displayName} stats set:\n${stats}`,
            components: [],
          });
          break;
        case "standardButton":
        case "rollButton":
        case "manualButton":
          exit = true;
          collector.stop();

        default:
      }
      if (!exit) {
        await i.update({
          content: `**Manual** - Set ability scores with no point limit.\nStrength: *${str}*\nDexterity: *${dex}*\nConstitution *${con}*\nIntelligence: *${int}*\nWisdom: *${wis}*\nCharisma: *${cha}*`,
          components: [buttonRow, statRow1, statRow2, statRow3, confirmRow],
        });
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
