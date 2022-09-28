const { Schema, model } = require('mongoose');
const weaponSchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: String,
    slug: String,
    attackType: String,
    reach: Number,
    rangeLower: Number,
    rangeUpper: Number,
    damage: String,
    damageType: String,
    weight: Number,
    cost: Number,
    rarity: String,
    description: String,
    properties: [String]
});

module.exports = model("Weapon", weaponSchema);