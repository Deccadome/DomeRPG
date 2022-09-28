const Character = require('../../schemas/character');
const Weapon = require('../../schemas/weapon');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const mongoose = require('mongoose');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('myinventory')
        .setDescription("Display your primary character's inventory."),
    async execute(interaction, client) {
        const curCharacter = await Character.findOne({ userId: interaction.user.id, active: true });
        const goldBalance = curCharacter.goldBalance;
        const embed = new EmbedBuilder()
            .setTitle(`${curCharacter.displayName}'s Inventory`)
            //.setDescription(`Description of embed`)
            .setColor(0xEA0029)
            .setThumbnail(client.user.displayAvatarURL())
            .addFields([
                {
                    name: `Gold`,
                    value: `${goldBalance}gp`,
                }
        ]);
        if(curCharacter.weapons.length){
            weaponNames = ``;
            weaponIDs = {};
            weaponQuantitiesString = ``;
            //console.log(curCharacter.weapons);
            for(const weapon of curCharacter.weapons){ // must use for-of instead of for-in
                //console.log(weapon);
                newWeapon = await Weapon.findOne({ _id: weapon.weaponID });
                if(newWeapon.id in weaponIDs){
                    weaponIDs[newWeapon.id]++;
                } else{
                    weaponNames += `${newWeapon.name}\n`;
                    weaponIDs[newWeapon.id] = 1;
                }
                //console.log(weaponIDs);
            };
            for(key in weaponIDs){
                //console.log(weaponIDs));
                weaponQuantitiesString += `${weaponIDs[key]}\n`;
            }
            embed.addFields([
                // { 
                //     name: `Weapons`,
                //     value: '\u200B' // Special character for blank field
                // },
                {
                    name: `Weapons`,
                    value: weaponNames,
                    inline: true
                },
                {
                    name: `Quantity`,
                    value: weaponQuantitiesString,
                    inline: true
                }
            ]);
        }

        await interaction.reply({
            embeds: [embed]
        });


    }
}