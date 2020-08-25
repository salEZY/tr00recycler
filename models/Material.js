const mongoose = require("mongoose");

const MaterialSchema = new mongoose.Schema({
  materialName: {
    type: String,
    unique: true,
    required: true,
  },
  materialType: {
    type: String,
    required: true,
  },
  creator: { type: mongoose.Types.ObjectId, required: true, ref: "users" },
});

module.exports = Material = mongoose.model("materijalis", MaterialSchema);
