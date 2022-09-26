const { Schema, model } = require('mongoose');
const characterSchema = new Schema({
    _id: Schema.Types.ObjectId,
    userId: {type: String, required: true},
    displayName: {type: String, required: true},
    charSlug: {type: String, required: true}, // first-last
    race: {type: String, required: true},
    subRace: String,
    class: {type: String, required: true},
    active: {type: Boolean, required: true},
    goldBalance: {type: Number, required: true, "default": 0 },
    weapons: [{ 
        weaponID: { type: Schema.Types.ObjectId, ref: 'Weapon', required: true },
        localId: Number, 
        customName: String,
        notes: String 
    }],
    armor: [{ 
        name: { type: String, ref: 'Armor', required: true }, 
        notes: String, 
    }],
    wands: [{ 
        itemId: { type: String, ref: 'Wand', required: true }, 
        name: String,
        notes: String 
    }],
    scrolls: [{ 
        scrollLevel: { type: Number, ref: 'Scroll', required: true }, 
        spellName: {type: String, ref: 'Spell', required: true },
        notes: String 
    }],
    potions: [{ 
        itemId: { type: String, ref: 'Potion' }, 
        notes: String 
    }],
    misc: [{ 
        itemName: { type: String, ref: 'Misc' }, // optional for pre-added miscellaneous items
        name: String, 
        notes: String 
    }],
});

module.exports = model("Character", characterSchema);

/*
    Adding a new weapon:
        Character.weapons.push('mongo ID of item', notes: 'Add notes here');
        Character.save();
*/