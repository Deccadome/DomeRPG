// To use these functions in another file, make sure to add:
// const Tools = require('relative/path/to/tools/tools.js')
//
// Usage would then be Tools.functionName();
const { SlashCommandBuilder } = require('discord.js');
const mongoose = require('mongoose');
const Scroll = require('../../schemas/scroll');
const Spell = require('../../schemas/spell');
const Weapon = require('../../schemas/weapon');

module.exports = {
    // Format character name (or any string) to replace spaces with '-' and make all letters lowercase
    formatSlug: function(input) {
        return input.replace(/\s+/g, '-').toLowerCase();
    },

    // Get respective suffix for spell levels (ie. 0 = Cantrip, 1 = 1st, etc.)
    getLevelSuffix: function(input) {
        if(input == 0) {
            return `Cantrip`;
        }
        else if(input == 1) return '1st Level';
        else if(input == 2) return '2nd Level';
        else if(input == 3) return '3rd Level';
        else return input + 'th Level';
    },

    // Adds a scroll to collection
    async addScroll(level, dc, attackBonus, underLevelCastDC){
        scrollExisting = await Scroll.findOne({ level: level });
        if(!scrollExisting){
            scrollProfile = await new Scroll({
                _id: mongoose.Types.ObjectId(),
                level: level,
                savingThrowDC: dc,
                attackBonus: attackBonus,
                underLevelCastDC: underLevelCastDC
            });
            
            await scrollProfile.save().catch(console.error);
        } else {
            scrollExisting.savingThrowDC = savingThrowDC;
            scrollExisting.attackBonus = attackBonus;
            scrollExisting.underLevelCastDC = underLevelCastDC;

            await scrollExisting.save().catch(console.error);
        }
    },

    // Adds a spell to respective table
    async addSpell(name, level, spellClass, castingTime, components, school, range, duration, description){
        slug = name.replace(/\s+/g, '-').toLowerCase();
        //console.log(`Name: ${name}, Slug: ${slug}`);
        spellExisting = await Spell.findOne({ slug: slug });
        if (!spellExisting){
            spellProfile = await new Spell({
                _id: mongoose.Types.ObjectId(),
                name: name,
                slug: slug,
                level: level,
                spellClass: spellClass,
                castingTime: castingTime,
                components: components,
                description: description,
                school: school
            });
            if(range){spellProfile.range = range;}
            if(duration){spellProfile.duration = duration;}

            try{
                await spellProfile.save()
            }
            catch{
                console.log(`Spell Name: ${name}`);
                console.error;
            }
        } else {
            spellExisting.level = level;
            spellExisting.castingTime = castingTime;
            spellExisting.spellClass = spellClass;
            spellExisting.components = components;
            spellExisting.description = description;
            spellExisting.school = school;
            if(range){spellExisting.range = range;}
            if(duration){spellExisting.duration = duration;}

            try{
                await spellExisting.save()
            }
            catch{
                console.log(`Spell Name: ${name}`);
                console.error;
            }
        }
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