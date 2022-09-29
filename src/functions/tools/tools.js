// To use these functions in another file, make sure to add:
// const Tools = require('relative/path/to/tools/tools.js')
//
// Usage would then be Tools.functionName();
const { SlashCommandBuilder } = require('discord.js');
const mongoose = require('mongoose');
const Scroll = require('../../schemas/scroll');
const Weapon = require('../../schemas/weapon');

module.exports = {
    // Format character name (or any string) to replace spaces with '-' and make all letters lowercase
    formatSlug: function(input) {
        return input.replace(/\s+/g, '-').toLowerCase();
    },

    // Adds a scroll to collection
    async addScroll(level, dc, attackBonus, underLevelCastDC){
        scrollProfile = await new Scroll({
            _id: mongoose.Types.ObjectId(),
            level: level,
            savingThrowDC: dc,
            attackBonus: attackBonus,
            underLevelCastDC: underLevelCastDC
        });
        await scrollProfile.save().catch(console.error);
    },

    // Adds a weapon to collection
    async addWeapon(name, attackType, reach, rangeLower, rangeUpper, damage, damageType, weight, rarity, cost, description, properties){
        slug = name.replace(/\s+/g, '-').toLowerCase();
        //console.log(`Name: ${name}, Slug: ${slug}`);
        weaponExisting = await Weapon.findOne({ slug: slug });
        if(!weaponExisting){
            weaponProfile = await new Weapon({
                _id: mongoose.Types.ObjectId(),
                name: name,
                slug: slug,
                attackType: attackType,
                damage: damage,
                damageType: damageType,
                weight: weight,
                rarity: rarity,
                description: description,
            });
            if(reach){ weaponProfile.reach = reach; }
            if(rangeLower){ weaponProfile.rangeLower = rangeLower; }
            if(rangeUpper){ weaponProfile.rangeUpper = rangeUpper; }
            if(properties){ weaponProfile.properties = properties; }
            if(cost){ weaponProfile.cost = cost; }

            await weaponProfile.save().catch(console.error);
            //console.log(`${name} loaded.`);
        }
        else{
            weaponExisting.name = name;
            weaponExisting.slug = slug;
            weaponExisting.attackType = attackType;
            weaponExisting.damage = damage;
            weaponExisting.damageType = damageType;
            weaponExisting.weight = weight;
            weaponExisting.rarity = rarity;
            weaponExisting.description = description;
            if(reach){ weaponExisting.reach = reach; } else{ weaponExisting.reach = undefined; }
            if(rangeLower){ weaponExisting.rangeLower = rangeLower; } else{ weaponExisting.rangeLower = undefined; }
            if(rangeUpper){ weaponExisting.rangeUpper = rangeUpper; } else{ weaponExisting.rangeUpper = undefined; }
            if(properties){ weaponExisting.properties = properties; } else{ weaponExisting.properties = undefined; }
            if(cost){ weaponExisting.cost = cost; } else{ weaponExisting.cost = undefined; }

            await weaponExisting.save().catch(console.error);
            //console.log(`${name} reloaded.`);
        }

    },
}