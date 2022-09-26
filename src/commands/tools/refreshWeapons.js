const Weapon = require('../../schemas/weapon')
const { SlashCommandBuilder } = require('discord.js');
const Tools = require('../../functions/tools/tools.js')
const mongoose = require('mongoose');
const { addWeapon } = require('../../functions/tools/tools.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('refreshweapons')
        .setDescription('Refreshes available weapon items.'),
    
    async execute(interaction, client) {
        await Weapon.collection.drop(); // deletes all scrolls in the table

        // addWeapon(name, attackType, reach, rangeLower, rangeUpper, damage, damageType, weight, rarity, description, [properties])
        await addWeapon('Battleaxe', 'Melee', 5, 0, 0, '1d8', 'Slashing', 4, 'Common', 'Proficiency with a battleaxe allows you to add your proficiency bonus to the attack roll for any attack you make with it.', ['Versatile (1d10)']);
        await addWeapon('Blowgun', 'Ranged', 0, 25, 100, '1', 'Piercing', 1, 'Common', 'Proficiency with a blowgun allows you to add your proficiency bonus to the attack roll for any attack you make with it.', ['Ammunition', 'Loading', 'Range']);
        await addWeapon('Boomerang', 'Ranged', 0, 60, 120, '1d4', 'Bludgeoning', 1, 'Common', "The boomerang is a ranged weapon, and any creature proficient with the javelin is also proficient with this weapon. On a miss, a boomerang returns to the thrower's hand.", ['Range']);
        await addWeapon('Club', 'Melee', 5, 0, 0, '1d4', 'Bludgeoning', 2, 'Common', 'Proficiency with a club allows you to add your proficiency bonus to the attack roll for any attack you make with it.', ['Light']);
        await addWeapon('Crossbow, hand', 'Ranged', 0, 30, 120, '1d6', 'Ranged', 3, 'Common', 'Proficiency with a hand crossbow allows you to add your proficiency bonus to the attack roll for any attack you make with it.', ['Ammunition', 'Range', 'Light', 'Loading']);
        await addWeapon('Crossbow, heavy', 'Ranged', 0, 100, 400, '1d10', 'Ranged', 18, 'Common', 'Proficiency with a heavy crossbow allows you to add your proficiency bonus to the attack roll for any attack you make with it.', ['Ammunition', 'Heavy', 'Range', 'Two-Handed', 'Loading']);
        await addWeapon('Dagger', 'Melee', 5, 0, 0, '1d4', 'Bludgeoning', 2, 'Common', 'Proficiency with a dagger allows you to add your proficiency bonus to the attack roll for any attack you make with it.', ['Finesse', 'Light', 'Thrown']);
        await addWeapon('Dart', 'Ranged', 0, 20, 60, '1d4', 'Piercing', 0.25, 'Common', 'Proficiency with a dart allows you to add your proficiency bonus to the attack roll for any attack you make with it.', ['Finesse', 'Thrown']);
        await addWeapon('Double-Bladed Scimitar', 'Melee', 5, 0, 0, '2d4', 'Slashing', 6, 'Common', 'The double-bladed scimitar is the signature weapon of Valenar elves. A haft of fine wood supports a long, curving blade on either end. Forged with techniques honed over centuries, these blades are strong, sharp, and remarkably light. Each scimitar is a masterpiece, and as a result the double-bladed scimitar is an expensive weapon (100 gp) — few though ever have the opportunity to purchase one. A Valenar blade in the hands of a non-elf is generally assumed to have been stolen or looted from a fallen foe, and a Valenar elf might feel entitled to demand its return or challenge the bearer to prove they’re worthy to wield it. \n\nSpecial: If you attack with a double-bladed scimitar as part of the Attack action on your turn, you can use a bonus action immediately after to make a melee attack with it. This attack deals 1d4 slashing damage on a hit, instead of 2d4.', ['Special', 'Two-Handed']);
        await addWeapon('Flail', 'Melee', 5, 0, 0, '1d8', 'Bludgeoning', 2, 'Common', 'Proficiency with a flail allows you to add your proficiency bonus to the attack roll for any attack you make with it.');
        await addWeapon('Glaive', 'Melee', 10, 0, 0, '1d10', 'Slashing', 6, 'Common', 'Proficiency with a glaive allows you to add your proficiency bonus to the attack roll for any attack you make with it.', ['Heavy', 'Reach', 'Two-Handed']);
        await addWeapon('Greataxe', 'Melee', 5, 0, 0, '1d12', 'Slashing', 7, 'Common', 'Proficiency with a greataxe allows you to add your proficiency bonus to the attack roll for any attack you make with it.', ['Heavy', 'Two-Handed']);
        await addWeapon('Greatclub', 'Melee', 5, 0, 0, '1d8', 'Bludgeoning', 10, 'Common', 'Proficiency with a greatclub allows you to add your proficiency bonus to the attack roll for any attack you make with it.', ['Two-Handed']);
        await addWeapon('Greatsword', 'Melee', 5, 0, 0, '2d6', 'Slashing', 6, 'Common', 'Proficiency with a greatsword allows you to add your proficiency bonus to the attack roll for any attack you make with it.', ['Heavy', 'Two-Handed']);
        await addWeapon('Halberd', 'Melee', 10, 0, 0, '1d10', 'Slashing', 6, 'Common', 'Proficiency with a halberd allows you to add your proficiency bonus to the attack roll for any attack you make with it.', ['Heavy', 'Two-Handed', 'Reach']);
        await addWeapon('Handaxe', 'Melee', 5, 20, 60, '1d6', 'Slashing', 2, 'Common', 'Proficiency with a handaxe allows you to add your proficiency bonus to the attack roll for any attack you make with it.', ['Light', 'Thrown']);
        await addWeapon('Javelin', 'Melee', 5, 30, 120, '1d6', 'Piercing', 2, 'Common', 'Proficiency with a javelin allows you to add your proficiency bonus to the attack roll for any attack you make with it.', ['Thrown']);
        await addWeapon('Lance', 'Melee', 10, 0, 0, '1d12', 'Piercing', 6, 'Common', "Proficiency with a dart allows you to add your proficiency bonus to the attack roll for any attack you make with it.\n\nYou have disadvantage when you use a lance to attack a target within 5 feet of you. Also, a lance requires two hands to wield when you aren't mounted", ['Reach', 'Special']);
        await addWeapon('Light Hammer', 'Melee', 5, 20, 60, '1d4', 'Bludgeoning', 2, 'Common', 'Proficiency with a light hammer allows you to add your proficiency bonus to the attack roll for any attack you make with it.', ['Light', 'Thrown']);
        await addWeapon('Longbow', 'Ranged', 0, 150, 600, '1d8', 'Piercing', 2, 'Common', 'Proficiency with a longbow allows you to add your proficiency bonus to the attack roll for any attack you make with it.', ['Ammunition', 'Heavy', 'Range', 'Two-Handed']);
        await addWeapon('Longsword', 'Melee', 5, 0, 0, '1d8', 'Slashing', 3, 'Common', 'Proficiency with a longsword allows you to add your proficiency bonus to the attack roll for any attack you make with it.', ['Versatile (1d10)']);
        await addWeapon('Mace', 'Melee', 5, 0, 0, '1d6', 'Bludgeoning', 4, 'Common', 'Proficiency with a mace allows you to add your proficiency bonus to the attack roll for any attack you make with it.');
        await addWeapon('Maul', 'Melee', 5, 0, 0, '2d6', 'Bludgeoning', 10, 'Common', 'Proficiency with a maul allows you to add your proficiency bonus to the attack roll for any attack you make with it.', ['Heavy', 'Two-Handed']);
        await addWeapon('Morningstar', 'Melee', 5, 0, 0, '1d8', 'Piercing', 4, 'Common', 'Proficiency with a morningstar allows you to add your proficiency bonus to the attack roll for any attack you make with it.');
        await addWeapon('Net', 'Ranged', 0, 5, 15, '', 'Bludgeoning', 3, 'Common', 'Proficiency with a net allows you to add your proficiency bonus to the attack roll for any attack you make with it.\n\nA Large or smaller creature hit by a net is restrained until it is freed. A net has no effect on creatures that are formless, or creatures that are Huge or larger. A creature can use its action to make a DC 10 Strength check, freeing itself or another creature within its reach on a success. Dealing 5 slashing damage to the net (AC 10) also frees the creature without harming it, ending the effect and destroying the net.\n\nWhen you use an action, bonus action, or reaction to attack with a net, you can make only one attack regardless of the number of attacks you can normally make.', ['Special', 'Thrown']);
        await addWeapon('Pike', 'Melee', 10, 0, 0, '1d10', 'Piercing', 18, 'Common', 'Proficiency with a pike allows you to add your proficiency bonus to the attack roll for any attack you make with it.', ['Heavy', 'Reach', 'Two-Handed']);
        await addWeapon('Quarterstaff', 'Melee', 5, 0, 0, '1d6', 'Bludgeoning', 4, 'Common', 'Proficiency with a quarterstaff allows you to add your proficiency bonus to the attack roll for any attack you make with it.', ['Versatile (1d8)']);
        await addWeapon('Rapier', 'Melee', 5, 0, 0, '1d8', 'Piercing', 2, 'Common', 'Proficiency with a rapier allows you to add your proficiency bonus to the attack roll for any attack you make with it.', ['Finesse']);
        await addWeapon('Scimitar', 'Melee', 5, 0, 0, '1d6', 'Slashing', 3, 'Common', 'Proficiency with a scimitar allows you to add your proficiency bonus to the attack roll for any attack you make with it.', ['Finesse', 'Light']);
        await addWeapon('Shortbow', 'Ranged', 0, 80, 320, '1d6', 'Piercing', 2, 'Common', 'Proficiency with a shortbow allows you to add your proficiency bonus to the attack roll for any attack you make with it.', ['Ammunition', 'Range', 'Two-Handed']);
        await addWeapon('Shortsword', 'Melee', 5, 0, 0, '1d6', 'Piercing', 2, 'Common', 'Proficiency with a shortsword allows you to add your proficiency bonus to the attack roll for any attack you make with it.', ['Finesse', 'Light']);
        await addWeapon('Sickle', 'Melee', 5, 0, 0, '1d4', 'Slashing', 2, 'Common', 'Proficiency with a shortsword allows you to add your proficiency bonus to the attack roll for any attack you make with it.', ['Light']);
        await addWeapon('Sling', 'Ranged', 0, 30, 120, '1d4', 'Bludgeoning', 1, 'Common', 'Proficiency with a sling allows you to add your proficiency bonus to the attack roll for any attack you make with it.', ['Ammunition', 'Range']);
        await addWeapon('Spear', 'Melee', 5, 20, 60, '1d6', 'Piercing', 3, 'Common', 'Proficiency with a spear allows you to add your proficiency bonus to the attack roll for any attack you make with it.', ['Thrown', 'Versatile (1d8)']);
        await addWeapon('Trident', 'Melee', 5, 20, 60, '1d6', 'Piercing', 4, 'Common', 'Proficiency with a trident allows you to add your proficiency bonus to the attack roll for any attack you make with it.', ['Thrown', 'Versatile (1d8)']);
        await addWeapon('War Pick', 'Melee', 5, 0, 0, '1d8', 'Piercing', 2, 'Common', 'Proficiency with a war pick allows you to add your proficiency bonus to the attack roll for any attack you make with it.');
        await addWeapon('Warhammer', 'Melee', 5, 0, 0, '1d8', 'Bludgeoning', 2, 'Common', 'Proficiency with a warhammer allows you to add your proficiency bonus to the attack roll for any attack you make with it.', ['Versatile (1d10)']);
        await addWeapon('Whip', 'Melee', 10, 0, 0, '1d4', 'Slashing', 3, 'Common', 'Proficiency with a whip allows you to add your proficiency bonus to the attack roll for any attack you make with it.', ['Finesse', 'Reach']);
        await addWeapon('Yklwa', 'Melee', 5, 10, 30, '1d8', 'Piercing', 2, 'Common', 'A yklwa (pronounced YICK-ul-wah) is a simple melee weapon that is the traditional weapon of Chultan warriors. A yklwa consists of a 3-foot wooden shaft with a steel or stone blade up to 18 inches long. Although it has the thrown weapon property, the yklwa is not well balanced for throwing (range 10/30 ft.).', ['Thrown']);
        
        
        

        await interaction.reply({
            content: `Weapons reloaded.`,
            ephemeral: true
        });

    }
}