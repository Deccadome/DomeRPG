const { Schema, model } = require('mongoose');
const playerSchema = new Schema({
    _id: Schema.Types.ObjectId,
    userId: String,
    characterName: String,
    characterLower: String,
    characterClass: String,
    characterActive: Boolean
});

module.exports = model("Player", playerSchema);