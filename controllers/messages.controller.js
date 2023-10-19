const router = require('express').Router();
const Message = require('../models/messages.model');
const validateSession = require('../middleware/vadlidateSession');

function errorResponse(res, err) {
  res.status(500).json({ ERROR: err.message });
}

//create a message for each room //we need room, owner, and message 
router.post("/newMessage/:roomId", validateSession, async (req, res) =>{
  try {
    const text = req.body.text;
    const room = req.params.roomId;
    const owner = req.user._id;
    const newMessage = new Message ({
      text,
      room,
      owner
    });
    await newMessage.save(); 
    res.status(201).json({
      message: 'New Message Created!',
      text: newMessage
    });
  } catch (err){
    errorResponse(res,err);
  } 
});
                
//get all messages per room
router.get('/allMessages/:room', validateSession, async (req, res) => {
  try {
    // Check if the user is authenticated with validateSession middleware
    if (!req.user) {
      res.status(403).json({ error: 'Authentication required' });
    }

    // Retrieve all messages
    const roomId = req.params.room
    const messages = await Message.find({room: roomId});

    if (!messages || messages.length === 0) {
      res.status(404).json({ message: 'No messages found' });
    }

    res.status(200).json({ messages });
  } catch (err) {
    errorResponse(res, err);
  }
});

//update message //PATCH
router.patch('/updateMessage/:room/:message', validateSession, async (req, res) => {
  try {
    const room = req.params.room;
    const messageId = req.params.message;
    const owner = req.user._id;
    
    // Check if the message exists in the specified room
    const message = await Message.findOne({ _id: messageId, room});

    if (!message) {
      res.status(404).json({ error: 'Message not found' });
    }

    // Check if the user is the owner of the message
    if (message.owner !== owner) {
      res.status(403).json({ error: 'You are not the owner of this message' });
    }

    const text = req.body.text;
    message.text = text || message.text;

    const updatedMessage = await message.save();

    res.status(200).json({
      message: 'Message Updated!',
      message: updatedMessage,
    });
  } catch (err) {
    errorResponse(res, err);
  }
});

//delete messages //messages should only be updated and deleted by the owner
router.delete('/deleteMessage/:room/:message', validateSession, async (req, res) => {
  try {
    const room = req.params.room;
    const messageId = req.params.message;
    const owner = req.user._id; // Assuming req.user contains user information

    // Check ownership of the message
    const message = await Message.findById(messageId);

    if (!message) {
      res.status(404).json({ error: 'Message not found' });
    }

    if (message.owner.toString() !== owner.toString()) {
      res.status(403).json({ error: 'You are not the owner of this message' });
    }

    // If the user is the owner, proceed with deletion
    const deletedMessage = await Message.deleteOne({ _id: messageId, room });

    if (!deletedMessage.deletedCount) {
      res.status(404).json({ error: 'Message not found' });
    }

    res.status(200).json({ message: 'Message deleted', deletedMessage });
  } catch (err) {
    errorResponse(res, err);
  }
});

module.exports = router;