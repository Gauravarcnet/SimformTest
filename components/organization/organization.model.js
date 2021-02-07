const mongoose = require('mongoose')
const Schema = mongoose.Schema
const organizationSchema = new Schema({
  name: {
    type: String,
    require: true
  },
  type: {
    type: String,
    require: true,
  },
  location: {
    type: String,
    default: 1
  },
  size: {
    type: Number
  },
  established: {
    type: Number,
    default: Date.now()
  }
}, {
    timestamps: true
  })

module.exports = mongoose.model('Organization', organizationSchema)