const mongoose = require('mongoose');


const MessageSchema = new mongoose.Schema({

  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  text: {
    type:String,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the "User" model
    required: true,
  },
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room', // Reference to the "Room" model
    required: true,
  },
});
const Message = mongoose.model('Message', MessageSchema);
module.exports = Message;