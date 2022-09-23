const { Schema, model } = require('mongoose');
const weaponSchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: String,
    attackType: String,
    range: String,
    damage: String,
    damageType: String,
    weight: Number,
    cost: Number,
    rarity: String,
    properties: [String]
});

module.exports = model("Weapon", weaponSchema);