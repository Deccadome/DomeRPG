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
        itemId: { type: Schema.Types.ObjectId, ref: 'Weapon', required: true }, 
        name: String,
        notes: String 
    }],
    armor: [{ 
        itemId: { type: Schema.Types.ObjectId, ref: 'Armor', required: true }, 
        notes: String, 
    }],
    wands: [{ 
        itemId: { type: Schema.Types.ObjectId, ref: 'Wand', required: true }, 
        usesRemaining: Number,
        name: String,
        notes: String 
    }],
    scrolls: [{ 
        scrollId: { type: Schema.Types.ObjectId, ref: 'Scroll', required: true }, 
        spellId: {type: Schema.Types.ObjectId, ref: 'Spell', required: true },
        notes: String 
    }],
    potions: [{ 
        itemId: { type: Schema.Types.ObjectId, ref: 'Potion' }, 
        notes: String 
    }],
    misc: [{ 
        itemId: { type: Schema.Types.ObjectId, ref: 'Misc' }, // optional for pre-added miscellaneous items
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