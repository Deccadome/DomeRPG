const Character = require('../../schemas/character');
const Weapon = require('../../schemas/weapon');
const Tools = require('../../functions/tools/tools.js');
const { SlashCommandBuilder } = require('discord.js');
const mongoose = require('mongoose');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('addweapon')
        .setDescription('Add a weapon to your primary character (must have a primary character to use).')
        .addStringOption(option => 
            option
                .setName('name')
                .setDescription('Name of the weapon to add')
                .setAutocomplete(true)
                .setRequired(true)
        )
        .addStringOption(option => 
            option
                .setName('customname')
                .setDescription('Custom name for the weapon')
                .setRequired(false)
        ),
    async autocomplete(interaction, client){
        const focusedValue = Tools.formatSlug(interaction.options.getFocused());
        choices = [];
        const cursor = await Weapon.find().cursor();
        for(let weapon = await cursor.next(); weapon != null; weapon = await cursor.next()){
            await choices.push(weapon.name);
        }
        //console.log(choices);
        const filtered = choices.filter((choice) => 
        Tools.formatSlug(choice).includes(focusedValue)
        );
        if(filtered.length > 20){
            do{
                filtered.pop();
            } while(filtered.length > 20);
        }
        await interaction.respond(
            filtered.map((choice) => ({ name: choice, value: choice }))
        );
    },
    async execute(interaction, client) {
        curCharacter = await Character.findOne({ userId: interaction.user.id, active: true });
        if(!curCharacter){
            await interaction.reply({
                content: 'You do not have a current primary character. Create a new one with /newcharacter or switch to an existing one with /changecharacter.',
                ephemeral: true
            });
        }
        else{
            const slug = Tools.formatSlug(interaction.options.getString('name'));
            const customName = interaction.options.getString('customname');
            choices = [];
            const cursor = await Weapon.find().cursor();
            for(let weapon = await cursor.next(); weapon != null; weapon = await cursor.next()){
                await choices.push(weapon.slug);
            }
            //console.log(choices);
            //console.log(`Curslug: ${slug}`);
            if(!choices.includes(slug)){
                await interaction.reply({ content: 'Invalid weapon.', ephemeral: true });
            }
            else{
                try {
                    newWeapon = await Weapon.findOne({ slug: slug });
                    weaponName = newWeapon.name;
                    outputName = weaponName;
                    numExisting = await curCharacter.weapons.length;
                    id = 0 + numExisting;
                    //console.log(curCharacter);
                    if(customName){
                        weaponToAdd = {weaponID: newWeapon.id, localId: id, customName: customName };
                        outputName = `${customName} (${weaponName})`;
                    }
                    else weaponToAdd = {weaponID: newWeapon.id, localId: id}; 
                    await curCharacter.weapons.push(weaponToAdd);
                    /* await curCharacter.weapons.push({
                        weaponID: newWeapon.id,
                        localId: id,
                        customName: customName
                    }); */
                    await curCharacter.save();
                    await interaction.reply({
                        content: `${outputName} successfully added to ${curCharacter.displayName}'s inventory.`,
                        ephemeral: true
                    });
                } catch (error) {
                    console.log(error);
                    await interaction.reply({ content: 'Unable to add weapon', ephemeral: true });
                }
            }
        }
        
    }
}