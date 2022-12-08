const { Schema, model } = require('mongoose');
const characterSchema = new Schema({
    _id: Schema.Types.ObjectId,
    userId: {type: String, required: true},
    displayName: {type: String, required: true},
    charSlug: {type: String, required: true}, // first-last
    race: {type: String, required: true},
    class: {type: String, required: true},
    active: {type: Boolean, required: true},
    goldBalance: {type: Number, required: true, "default": 0 },
    strength: {type: Number, required: true},
    dexterity: {type: Number, required: true},
    constitution: {type: Number, required: true},
    intelligence: {type: Number, required: true},
    charisma: {type: Number, required: true},
    wisdom: {type: Number, required: true},
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
        itemId: { type: Schema.Types.ObjectId, ref: 'Wand', required: true }, 
        usesRemaining: Number,
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
    spells: [{
        spellName: { type: String, ref: 'Spell', required: true },
    }],
});

module.exports = model("Character", characterSchema);

/*
    Adding a new weapon:
        Character.weapons.push('mongo ID of item', notes: 'Add notes here');
        Character.save();
*/