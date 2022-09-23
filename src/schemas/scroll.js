const { Schema, model } = require('mongoose');
const scrollSchema = new Schema({
    _id: Schema.Types.ObjectId,
    level: Number,
    savingThrowDC: Number,
    attackBonus: Number,
    cost: Number,
    properties: [String]
});

module.exports = model("Scroll", scrollSchema);