const Spell = require('../../schemas/spell');
const { formatSlug } = require('../tools/tools.js');
const mongoose = require('mongoose');

module.exports = {
    async testSpellDescriptions(){
        const cursor = await Spell.find().cursor();
        counter = 0;
        for(let spell = await cursor.next(); spell != null; spell = await cursor.next()){
            if(spell.description.length >= 1024){
                
                spellName = spell.name;
                description = spell.description;
                descriptionParts = description.split(/\n\s*\n/g);
                for(parts in descriptionParts){
                    if (parts.length >= 1024){
                        counter++;
                        console.log(spellName);
                    }
                }
            }
        }
        console.log("Test spell descriptions ran: " + counter + ".");
    }
}

