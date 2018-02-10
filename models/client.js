'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')

const ClientSchema = new Schema({
  email: {type: String, unique: true, required: true, lowercase: true},
  password: {type:String, select:false, required: true},
  name: String,
  avatar: String,
  phone: String,
  address: String,
  deliveries: [String],
  position: {
    lat: {type: Number, default: 0.0},
    lng: {type: Number, default: 0.0}
  },
  signupDate: {type: Date, default: Date.now()},
  lastLogin: Date
})

ClientSchema.pre('save',(next)=>{
  let client = this
  if(client.password == "") return next()

  bcrypt.genSalt(10, (err,salt)=>{
    if(err) return next()

    bcrypt.hash(client.password, salt, null, (err, hash)=>{
      if(err) return next(err)

      client.password = hash
      next()
    })
  })
})

module.exports = mongoose.model('Client',ClientSchema)
