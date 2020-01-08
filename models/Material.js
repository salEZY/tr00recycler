const mongoose = require('mongoose')

const MaterialSchema = new mongoose.Schema({
  materialName: {
    type: String,
    required: true,
    unique: true
  },
  typeOfMaterial: {
    type: String,
    required: true
  }
})

module.exports = Material = mongoose.model('materials', MaterialSchema)