const mongoose = require("mongoose");

//message Schema

let MarkersSchema = mongoose.Schema({
  owner: {
    type: String,
    require: true
  },
  longitude: {
    type: Number,
    required: true
  },
  latitude: {
    type: Number,
    required: true
  },
  createdAt: { type: Date, default: Date.now }
});

const Marker = (module.exports = mongoose.model("Marker", MarkersSchema));
