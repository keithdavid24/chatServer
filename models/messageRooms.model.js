const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  //this will give us a title and make it required and unique so no other title can be the same
  title: {
    type: String,
    required: true,
    unique: true,
  },
  // description is a string that is not required
  description: String,
  //this will have an array of messages referenced by its ObjectId
  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Message', 
    },
  ],
  // field is required and references the "User" model, indicating that the user is the admin of the room
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;