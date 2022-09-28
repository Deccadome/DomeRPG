const { Schema, model } = require('mongoose');
const spellSchema = new Schema({
    _id: Schema.Types.ObjectId,
    level: {type: Number, required: true},
    castingTime: {type: Number, required: true},
    components: {type: String, required: true},
    description: {type: String, required: true},
    school: {type: String, required: true},
    savingThrowDC: {type: Number, required: false},
    damage: {type: String, required: false},
    range: {type: String, required: false},
    duration: {type: String, required: false},
    saveThrowType: {type: String, required: false}, //E.x. charisma
});

module.exports = model("Spell", spellSchema);