const { Schema, model } = require('mongoose');
const spellSchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: {type: String, require: true},
    level: {type: Number, required: true},
    spellClass: [{type: String, require: true}],
    castingTime: {type: String, required: true},
    components: {type: String, required: true},
    school: {type: String, required: true},
    range: {type: String, required: false},
    duration: {type: String, required: false},
    description: {type: String, required: true},
    slug: {type: String, require: true},
});

module.exports = model("Spell", spellSchema);