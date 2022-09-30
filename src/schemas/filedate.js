const { Schema, model } = require('mongoose');
const fileDateSchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: { type: String, required: true },
    lastModified: {type: Date, required: true }
});

module.exports = model("FileDate", fileDateSchema);