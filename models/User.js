const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  admin: { type: Boolean, default: false },
  profile: {
    username: { type: String, default: "" },
  },
  favoriteCreatures: [{ type: Schema.Types.ObjectId, ref: "Creatures" }],
});

module.exports = mongoose.model("User", userSchema);
