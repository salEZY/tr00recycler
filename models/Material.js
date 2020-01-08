const mongoose = require('mongoose')

const MaterialSchema = new mongoose.Schema({
  materialName: {
    type: String,
    unique: true,
    required: true
  },
  materialType: {
    type: String,
    required: true
  }
})

module.exports = Material = mongoose.model('materijali', MaterialSchema)