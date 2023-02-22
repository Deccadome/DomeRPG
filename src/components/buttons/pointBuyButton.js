// Point Buy assignment for Ability Scores
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const Character = require("../../schemas/character");
const mongoose = require("mongoose");
const { getStats } = require("../../functions/tools/charCreationTools");

module.exports = {
  data: {
    name: `pointBuyButton`,
  },
  async execute(interaction, client) {
    const buttonStandard = new ButtonBuilder()
      .setCustomId(`standardButton`)
      .setLabel(`Standard`)
      .setStyle(ButtonStyle.Primary);
    const buttonPointBuy = new ButtonBuilder()
      .setCustomId(`pointBuyButton`)
      .setLabel(`Point Buy`)
      .setStyle(ButtonStyle.Primary)
      .setDisabled(true);
    const buttonManual = new ButtonBuilder()
      .setCustomId(`manualButton`)
      .setLabel(`Manual`)
      .setStyle(ButtonStyle.Primary);
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
      .setLabel(`STR-1 (+1 pt)`)
      .setStyle(ButtonStyle.Danger)
      .setDisabled(true);
    const strInc = new ButtonBuilder()
      .setCustomId(`nRstrInc`)
      .setLabel(`STR+1 (-1 pt)`)
      .setStyle(ButtonStyle.Success)
      .setDisabled(false);
    const dexDec = new ButtonBuilder()
      .setCustomId(`nRdexDec`)
      .setLabel(`DEX-1 (+1 pt)`)
      .setStyle(ButtonStyle.Danger)
      .setDisabled(true);
    const dexInc = new ButtonBuilder()
      .setCustomId(`nRdexInc`)
      .setLabel(`DEX+1 (-1 pt)`)
      .setStyle(ButtonStyle.Success)
      .setDisabled(false);
    const conDec = new ButtonBuilder()
      .setCustomId(`nRconDec`)
      .setLabel(`CON-1 (+1 pt)`)
      .setStyle(ButtonStyle.Danger)
      .setDisabled(true);
    const conInc = new ButtonBuilder()
      .setCustomId(`nRconInc`)
      .setLabel(`CON+1 (-1 pt)`)
      .setStyle(ButtonStyle.Success)
      .setDisabled(false);
    const intDec = new ButtonBuilder()
      .setCustomId(`nRintDec`)
      .setLabel(`INT-1 (+1 pt)`)
      .setStyle(ButtonStyle.Danger)
      .setDisabled(true);
    const intInc = new ButtonBuilder()
      .setCustomId(`nRintInc`)
      .setLabel(`INT+1 (-1 pt)`)
      .setStyle(ButtonStyle.Success)
      .setDisabled(false);
    const wisDec = new ButtonBuilder()
      .setCustomId(`nRwisDec`)
      .setLabel(`WIS-1 (+1 pt)`)
      .setStyle(ButtonStyle.Danger)
      .setDisabled(true);
    const wisInc = new ButtonBuilder()
      .setCustomId(`nRwisInc`)
      .setLabel(`WIS+1 (-1 pt)`)
      .setStyle(ButtonStyle.Success)
      .setDisabled(false);
    const chaDec = new ButtonBuilder()
      .setCustomId(`nRchaDec`)
      .setLabel(`CHA-1 (+1 pt)`)
      .setStyle(ButtonStyle.Danger)
      .setDisabled(true);
    const chaInc = new ButtonBuilder()
      .setCustomId(`nRchaInc`)
      .setLabel(`CHA+1 (-1 pt)`)
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

    pointsRemaining = 27;
    str = 8;
    dex = 8;
    con = 8;
    int = 8;
    wis = 8;
    cha = 8;
    exit = false;

    await interaction.update({
      content: `**Point Buy** - Spend up to 27 points on Ability Scores\n\nPoints Remaining: **${pointsRemaining}**\nStrength: *${str}*\nDexterity: *${dex}*\nConstitution *${con}*\nIntelligence: *${int}*\nWisdom: *${wis}*\nCharisma: *${cha}*`,
      components: [buttonRow, statRow1, statRow2, statRow3, confirmRow],
    });

    const collector = interaction.channel.createMessageComponentCollector({
      time: 300000,
    });

    collector.on("collect", async (i) => {
      if (i.user.id !== interaction.user.id) return;
      switch (i.customId) {
        case "nRstrDec":
          if (str >= 14) pointsRemaining += 2;
          else pointsRemaining++;
          str--;
          if (str == 8) strDec.setDisabled(true);
          else if (str == 12) strInc.setLabel(`STR+1 (-1 pt)`);
          else if (str == 13) strDec.setLabel(`STR-1 (+1 pt)`);
          else if (str == 14) strInc.setDisabled(false);
          break;
        case "nRstrInc":
          if (str >= 13) pointsRemaining -= 2;
          else pointsRemaining--;
          str++;
          if (str == 9) strDec.setDisabled(false);
          else if (str == 13) strInc.setLabel(`STR+1 (-2 pts)`);
          else if (str == 14) strDec.setLabel(`STR-1 (+2 pts)`);
          else if (str == 15) strInc.setDisabled(true);
          break;
        case "nRdexDec":
          if (dex >= 14) pointsRemaining += 2;
          else pointsRemaining++;
          dex--;
          if (dex == 8) dexDec.setDisabled(true);
          else if (dex == 12) dexInc.setLabel(`DEX+1 (-1 pt)`);
          else if (dex == 13) dexDec.setLabel(`DEX-1 (+1 pt)`);
          else if (dex == 14) dexInc.setDisabled(false);
          break;
        case "nRdexInc":
          if (dex >= 13) pointsRemaining -= 2;
          else pointsRemaining--;
          dex++;
          if (dex == 9) dexDec.setDisabled(false);
          else if (dex == 13) dexInc.setLabel(`DEX+1 (-2 pts)`);
          else if (dex == 14) dexDec.setLabel(`DEX-1 (+2 pts)`);
          else if (dex == 15) dexInc.setDisabled(true);
          break;
        case "nRconDec":
          if (con >= 14) pointsRemaining += 2;
          else pointsRemaining++;
          con--;
          if (con == 8) conDec.setDisabled(true);
          else if (con == 12) conInc.setLabel(`CON+1 (-1 pt)`);
          else if (con == 13) conDec.setLabel(`CON-1 (+1 pt)`);
          else if (con == 14) conInc.setDisabled(false);
          break;
        case "nRconInc":
          if (con >= 13) pointsRemaining -= 2;
          else pointsRemaining--;
          con++;
          if (con == 9) conDec.setDisabled(false);
          else if (con == 13) conInc.setLabel(`CON+1 (-2 pts)`);
          else if (con == 14) conDec.setLabel(`CON-1 (+2 pts)`);
          else if (con == 15) conInc.setDisabled(true);
          break;
        case "nRintDec":
          if (int >= 14) pointsRemaining += 2;
          else pointsRemaining++;
          int--;
          if (int == 8) intDec.setDisabled(true);
          else if (int == 12) intInc.setLabel(`INT+1 (-1 pt)`);
          else if (int == 13) intDec.setLabel(`INT-1 (+1 pt)`);
          else if (int == 14) intInc.setDisabled(false);
          break;
        case "nRintInc":
          if (int >= 13) pointsRemaining -= 2;
          else pointsRemaining--;
          int++;
          if (int == 9) intDec.setDisabled(false);
          else if (int == 13) intInc.setLabel(`INT+1 (-2 pts)`);
          else if (int == 14) intDec.setLabel(`INT-1 (+2 pts)`);
          else if (int == 15) intInc.setDisabled(true);
          break;
        case "nRwisDec":
          if (wis >= 14) pointsRemaining += 2;
          else pointsRemaining++;
          wis--;
          if (wis == 8) wisDec.setDisabled(true);
          else if (wis == 12) wisInc.setLabel(`WIS+1 (-1 pt)`);
          else if (wis == 13) wisDec.setLabel(`WIS-1 (+1 pt)`);
          else if (wis == 14) wisInc.setDisabled(false);
          break;
        case "nRwisInc":
          if (wis >= 13) pointsRemaining -= 2;
          else pointsRemaining--;
          wis++;
          if (wis == 9) wisDec.setDisabled(false);
          else if (wis == 13) wisInc.setLabel(`WIS+1 (-2 pts)`);
          else if (wis == 14) wisDec.setLabel(`WIS-1 (+2 pts)`);
          else if (wis == 15) wisInc.setDisabled(true);
          break;
        case "nRchaDec":
          if (cha >= 14) pointsRemaining += 2;
          else pointsRemaining++;
          cha--;
          if (cha == 8) chaDec.setDisabled(true);
          else if (cha == 12) chaInc.setLabel(`CHA+1 (-1 pt)`);
          else if (cha == 13) chaDec.setLabel(`CHA-1 (+1 pt)`);
          else if (cha == 14) chaInc.setDisabled(false);
          break;
        case "nRchaInc":
          if (cha >= 13) pointsRemaining -= 2;
          else pointsRemaining--;
          cha++;
          if (cha == 9) chaDec.setDisabled(false);
          else if (cha == 13) chaInc.setLabel(`CHA+1 (-2 pts)`);
          else if (cha == 14) chaDec.setLabel(`CHA-1 (+2 pts)`);
          else if (cha == 15) chaInc.setDisabled(true);
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
        case "standardButton":
        case "rollButton":
        case "manualButton":
          exit = true;
          collector.stop();
        default:
      }
      if (pointsRemaining == 0) {
        strInc.setDisabled(true);
        dexInc.setDisabled(true);
        conInc.setDisabled(true);
        intInc.setDisabled(true);
        wisInc.setDisabled(true);
        chaInc.setDisabled(true);
      } else if (pointsRemaining == 1) {
        if (str >= 13) strInc.setDisabled(true);
        else strInc.setDisabled(false);
        if (dex >= 13) dexInc.setDisabled(true);
        else dexInc.setDisabled(false);
        if (con >= 13) conInc.setDisabled(true);
        else conInc.setDisabled(false);
        if (int >= 13) intInc.setDisabled(true);
        else intInc.setDisabled(false);
        if (wis >= 13) wisInc.setDisabled(true);
        else wisInc.setDisabled(false);
        if (cha >= 13) chaInc.setDisabled(true);
        else chaInc.setDisabled(false);
      } else if (pointsRemaining == 2) {
        if (str > 15) strInc.setDisabled(false);
        if (dex > 15) dexInc.setDisabled(false);
        if (con > 15) conInc.setDisabled(false);
        if (int > 15) intInc.setDisabled(false);
        if (wis > 15) wisInc.setDisabled(false);
        if (cha > 15) chaInc.setDisabled(false);
      }
      if (!exit) {
        await i.update({
          content: `**Point Buy** - Spend up to 27 points on Ability Scores\n\nPoints Remaining: **${pointsRemaining}**\nStrength: *${str}*\nDexterity: *${dex}*\nConstitution *${con}*\nIntelligence: *${int}*\nWisdom: *${wis}*\nCharisma: *${cha}*`,
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
        console.log(`Point buy collector timed out.`);
      } else console.log(`Point buy collector stopping.`);
    });
  },
};
