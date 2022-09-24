const { Schema, model } = require('mongoose');
const scrollSchema = new Schema({
    _id: Schema.Types.ObjectId,
    level: {type: Number, required: true},
    savingThrowDC: {type: Number, required: true},
    attackBonus: {type: Number, required: true},
    underLevelCastDC: {type: Number, required: true},
    cost: Number,
    description: {type: String, default: 'A spell scroll bears the words of a single spell, written in a mystical cipher. If the spell is on your class’s spell list, you can read the scroll and cast its spell without providing any material components. Otherwise, the scroll is unintelligible. Casting the spell by reading the scroll requires the spell’s normal casting time. Once the spell is cast, the words on the scroll fade, and it crumbles to dust. If the casting is interrupted, the scroll is not lost. If the spell is on your class’s spell list but of a higher level than you can normally cast, you must make an ability check using your spellcasting ability to determine whether you cast it successfully. On a failed check, the spell disappears from the scroll with no other effect. A wizard spell on a spell scroll can be copied just as spells in spellbooks can be copied. When a spell is copied from a spell scroll, the copier must succeed on an Intelligence (Arcana) check. If the check succeeds, the spell is successfully copied. Whether the check succeeds or fails, the spell scroll is destroyed.'}
});

module.exports = model("Scroll", scrollSchema);