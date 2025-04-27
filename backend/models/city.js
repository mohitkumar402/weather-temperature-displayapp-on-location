const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
  city: { type: String, required: true },
  temp: { type: Number, required: true },
  description: { type: String, required: true },
  icon: { type: String, required: true }
});

// Use this to avoid model overwrite errors
module.exports = mongoose.models.City || mongoose.model('City', citySchema);
