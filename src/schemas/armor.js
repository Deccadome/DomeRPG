const { Schema, model } = require('mongoose');
const armorSchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: String,
    armorClass: Number,
    weight: Number,
    cost: Number,
    rarity: String,
    properties: [String]
});

module.exports = model("Armor", armorSchema);