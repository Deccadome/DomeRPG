const { Schema, model } = require('mongoose');
const potionSchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: String,
    weight: Number,
    cost: Number,
    description: String
});

module.exports = model("Potion", potionSchema);