// Automatically rolled assignment for Ability Scores
const {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  StringSelectMenuBuilder,
} = require("discord.js");
const {
  populateOptions,
  getStats,
  getModifier,
} = require("../../functions/tools/charCreationTools.js");
const { removeByValue, rollDie } = require("../../functions/tools/tools.js");
const Character = require("../../schemas/character");
const mongoose = require("mongoose");

const ROLL = -1;
const STR = 0;
const DEX = 1;
const CON = 2;
const INT = 3;
const WIS = 4;
const CHA = 5;
const CONFIRM = 6;
const DONE = 7;
const BREAK = 8;

module.exports = {
  data: {
    name: `rollButton`,
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
      .setStyle(ButtonStyle.Primary);
    const buttonRoll = new ButtonBuilder()
      .setCustomId(`rollButton`)
      .setLabel(`Roll`)
      .setStyle(ButtonStyle.Primary)
      .setDisabled();
    const methodButtonRow = new ActionRowBuilder().addComponents([
      buttonStandard,
      buttonPointBuy,
      buttonManual,
      buttonRoll,
    ]);

    scores = [0, 0, 0, 0, 0, 0];
    inputScores = [0, 0, 0, 0, 0, 0];

    strMenu = new StringSelectMenuBuilder()
      .setCustomId(`nRstrMenu`)
      .setPlaceholder("STRENGTH (STR)")
      .setMinValues(1)
      .setMaxValues(1);
    strMenu = populateOptions(strMenu, scores);

    dexMenu = new StringSelectMenuBuilder()
      .setCustomId(`nRdexMenu`)
      .setPlaceholder("DEXTERITY (DEX)")
      .setMinValues(1)
      .setMaxValues(1);

    conMenu = new StringSelectMenuBuilder()
      .setCustomId(`nRconMenu`)
      .setPlaceholder("CONSTITUTION (CON)")
      .setMinValues(1)
      .setMaxValues(1);

    intMenu = new StringSelectMenuBuilder()
      .setCustomId(`nRintMenu`)
      .setPlaceholder("INTELLIGENCE (INT)")
      .setMinValues(1)
      .setMaxValues(1);

    wisMenu = new StringSelectMenuBuilder()
      .setCustomId(`nRwisMenu`)
      .setPlaceholder("WISDOM (WIS)")
      .setMinValues(1)
      .setMaxValues(1);

    chaMenu = new StringSelectMenuBuilder()
      .setCustomId(`nRchaMenu`)
      .setPlaceholder("CHARISMA (CHA)")
      .setMinValues(1)
      .setMaxValues(1);

    rollButton = new ButtonBuilder()
      .setCustomId(`nRrollButton`)
      .setLabel(`Roll`)
      .setStyle(ButtonStyle.Success);

    const backButton = new ButtonBuilder()
      .setCustomId(`nRbackButton`)
      .setLabel(`Back`)
      .setStyle(ButtonStyle.Secondary);

    const confirmButton = new ButtonBuilder()
      .setCustomId(`nRconfirmButton`)
      .setLabel(`Confirm`)
      .setStyle(ButtonStyle.Success);

    const rollRow = new ActionRowBuilder().addComponents([rollButton]);
    const scoreInputRow = new ActionRowBuilder().addComponents([strMenu]);
    const confirmRow = new ActionRowBuilder().addComponents([backButton]);

    exit = false;

    await interaction.update({
      content: `**Roll** - Assign 6 randomly-generated numbers to your Ability Scores.\nEach number is generated with 4d6, dropping the lowest number.`,
      components: [methodButtonRow, rollRow],
    });

    const collector = interaction.channel.createMessageComponentCollector({
      time: 300000,
    });

    statList = "";
    state = ROLL;

    collector.on("collect", async (i) => {
      if (i.user.id !== interaction.user.id) return;
      switch (i.customId) {
        case "nRrollButton":
          rollButton.setLabel("Reroll");
          for (j = 0; j < 6; j++) {
            rolls = rollDie(4, 6)[1];
            rolls = removeByValue(rolls, Math.min(...rolls));
            score = rolls[0] + rolls[1] + rolls[2];
            scores[j] = score;
          }
          state = STR;
          strMenu = populateOptions(strMenu, scores);
          scoreInputRow.setComponents([strMenu]);

          await i.update({
            content: `Rolled scores: ${scores}\n`,
            components: [scoreInputRow, confirmRow],
          });
          break;
        case "nRstrMenu":
          inputScores[STR] = parseInt(i.values[0]);
          scores = removeByValue(scores, inputScores[STR]);
          statList += `STR: ${inputScores[STR]} (${getModifier(
            inputScores[STR]
          )})\n`;

          state = DEX;
          dexMenu = populateOptions(dexMenu, scores);
          scoreInputRow.setComponents([dexMenu]);

          await i.update({
            content: `Rolled scores: ${scores}\n\n${statList}`,
            components: [scoreInputRow, confirmRow],
          });
          break;
        case "nRdexMenu":
          inputScores[DEX] = parseInt(i.values[0]);
          scores = removeByValue(scores, inputScores[DEX]);
          statList += `DEX: ${inputScores[DEX]} (${getModifier(
            inputScores[DEX]
          )})\n`;

          state = CON;
          conMenu = populateOptions(conMenu, scores);
          scoreInputRow.setComponents([conMenu]);

          await i.update({
            content: `Rolled scores: ${scores}\n\n${statList}`,
            components: [scoreInputRow, confirmRow],
          });
          break;
        case "nRconMenu":
          inputScores[CON] = parseInt(i.values[0]);
          scores = removeByValue(scores, inputScores[CON]);
          statList += `CON: ${inputScores[CON]} (${getModifier(
            inputScores[CON]
          )})\n`;

          state = INT;
          intMenu = populateOptions(intMenu, scores);
          scoreInputRow.setComponents([intMenu]);

          await i.update({
            content: `Rolled scores: ${scores}\n\n${statList}`,
            components: [scoreInputRow, confirmRow],
          });
          break;
        case "nRintMenu":
          inputScores[INT] = parseInt(i.values[0]);
          scores = removeByValue(scores, inputScores[INT]);
          statList += `INT: ${inputScores[INT]} (${getModifier(
            inputScores[INT]
          )})\n`;

          state = WIS;
          wisMenu = populateOptions(wisMenu, scores);
          scoreInputRow.setComponents([wisMenu]);

          await i.update({
            content: `Rolled scores: ${scores}\n\n${statList}`,
            components: [scoreInputRow, confirmRow],
          });
          break;
        case "nRwisMenu":
          inputScores[WIS] = parseInt(i.values[0]);
          scores = removeByValue(scores, inputScores[WIS]);
          statList += `WIS: ${inputScores[WIS]} (${getModifier(
            inputScores[WIS]
          )})\n`;

          state = CHA;
          chaMenu = populateOptions(chaMenu, scores);
          scoreInputRow.setComponents([chaMenu]);

          await i.update({
            content: `Rolled scores: ${scores}\n\n${statList}`,
            components: [scoreInputRow, confirmRow],
          });
          break;
        case "nRchaMenu":
          inputScores[CHA] = parseInt(i.values[0]);
          scores = removeByValue(scores, inputScores[CHA]);
          statList += `CHA: ${inputScores[CHA]} (${getModifier(
            inputScores[CHA]
          )})\n`;

          state = CONFIRM;
          confirmRow.addComponents(confirmButton);

          await i.update({
            content: `${statList}**Confirm Scores?**`,
            components: [confirmRow],
          });
          break;
        case "nRconfirmButton":
          confirmRow.setComponents(backButton);
          activeChar = await Character.findOne({
            userId: interaction.user.id,
            active: true,
          });
          if (activeChar) {
            activeChar.strength = inputScores[STR];
            activeChar.dexterity = inputScores[DEX];
            activeChar.constitution = inputScores[CON];
            activeChar.intelligence = inputScores[INT];
            activeChar.wisdom = inputScores[WIS];
            activeChar.charisma = inputScores[CHA];
            await activeChar.save().catch(console.error);
          }
          stats = await getStats(interaction.user.id);
          await i.update({
            content: `${activeChar.displayName} stats set:\n${stats}`,
            components: [],
          });
          state = DONE;
          collector.stop();
          break;
        case "nRbackButton":
          switch (state) {
            case STR:
              await i.update({
                content: `**Roll** - Assign 6 randomly-generated numbers to your Ability Scores.\nEach number is generated with 4d6, dropping the lowest number.`,
                components: [methodButtonRow, rollRow],
              });
              state = ROLL;
              break;
            case DEX:
              scores.push(inputScores[STR]);
              populateOptions(strMenu, scores);
              statList = statList.replace(
                `STR: ${inputScores[STR]} (${getModifier(inputScores[STR])})\n`,
                ""
              );
              scoreInputRow.setComponents([strMenu]);
              await i.update({
                content: `Rolled scores: ${scores}\n\n${statList}`,
                components: [scoreInputRow, confirmRow],
              });
              state = STR;
              break;
            case CON:
              scores.push(inputScores[DEX]);
              populateOptions(dexMenu, scores);
              statList = statList.replace(
                `DEX: ${inputScores[DEX]} (${getModifier(inputScores[DEX])})\n`,
                ""
              );
              scoreInputRow.setComponents([dexMenu]);
              await i.update({
                content: `Rolled scores: ${scores}\n\n${statList}`,
                components: [scoreInputRow, confirmRow],
              });
              state = DEX;
              break;
            case INT:
              scores.push(inputScores[CON]);
              populateOptions(conMenu, scores);
              statList = statList.replace(
                `CON: ${inputScores[CON]} (${getModifier(inputScores[CON])})\n`,
                ""
              );
              scoreInputRow.setComponents([conMenu]);
              await i.update({
                content: `Rolled scores: ${scores}\n\n${statList}`,
                components: [scoreInputRow, confirmRow],
              });
              state = CON;
              break;
            case WIS:
              scores.push(inputScores[INT]);
              populateOptions(intMenu, scores);
              statList = statList.replace(
                `INT: ${inputScores[INT]} (${getModifier(inputScores[INT])})\n`,
                ""
              );
              scoreInputRow.setComponents([intMenu]);
              await i.update({
                content: `Rolled scores: ${scores}\n\n${statList}`,
                components: [scoreInputRow, confirmRow],
              });
              state = INT;
              break;
            case CHA:
              scores.push(inputScores[WIS]);
              populateOptions(wisMenu, scores);
              statList = statList.replace(
                `WIS: ${inputScores[WIS]} (${getModifier(inputScores[WIS])})\n`,
                ""
              );
              scoreInputRow.setComponents([wisMenu]);
              await i.update({
                content: `Rolled scores: ${scores}\n\n${statList}`,
                components: [scoreInputRow, confirmRow],
              });
              state = WIS;
              break;
            case CONFIRM:
              scores.push(inputScores[CHA]);
              populateOptions(chaMenu, scores);
              statList = statList.replace(
                `CHA: ${inputScores[CHA]} (${getModifier(inputScores[CHA])})\n`,
                ""
              );
              confirmRow.setComponents(backButton);
              await i.update({
                content: `Rolled scores: ${scores}\n\n${statList}`,
                components: [scoreInputRow, confirmRow],
              });
              state = CHA;
              break;
            default:
          }
          break;
        case "standardButton":
        case "pointBuyButton":
        case "manualButton":
          state = BREAK;
          collector.stop();
          break;
        default:
          console.log(`Unknown interaction: ${i.customId}`);
      }
    });

    collector.on("end", (collected) => {
      if (state != DONE && state != BREAK) {
        interaction.deleteReply();
        interaction.channel.send(
          `<@${interaction.user.id}> Interaction timed out. Please try again.`
        );
        console.log(`Roll stat collector timed out.`);
      } else console.log(`Roll stat collector stopping.`);
    });
  },
};
