const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const creaturesScema = new Schema({
  region: { type: String, required: true },
  name: { type: String, required: true },
  race: { type: String, require: true },
  description: { type: String, required: true },
  img: { type: String, required: true },
  story: { type: String, required: true },
  tale: { type: String },
  symbolism: { type: String, required: true },
  abilities: { type: String, default: "" },
  weaknesses: { type: String, default: "" },
});

module.exports = mongoose.model("Creatures", creaturesScema);
