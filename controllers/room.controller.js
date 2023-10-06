const router = require('express').Router();
const Room = require('../models/room.model');

// Error response function
function errorResponse(res, err) {
  res.status(500).json({ ERROR: err.message });
}

// Create a new room
router.post('/rooms', async (req, res) => {
  try {
    const { title, description } = req.body;
    const ownerId = req.user._id; // Assuming req.user contains user information

    const room = new Room({
      title,
      description,
      ownerId,
    });

    const newRoom = await room.save();

    res.status(201).json({
      message: 'New Room Created!',
      room: newRoom,
    });
  } catch (err) {
    errorResponse(res, err);
  }
});

// Get one room by ID
router.get('/rooms/:id', async (req, res) => {
  try {
    const roomId = req.params.id;

    const room = await Room.findById(roomId);

    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }

    res.status(200).json({ room });
  } catch (err) {
    errorResponse(res, err);
  }
});

// Get all rooms
router.get('/rooms', async (req, res) => {
  try {
    const rooms = await Room.find();

    res.status(200).json({ rooms });
  } catch (err) {
    errorResponse(res, err);
  }
});

// Update a room by ID
router.patch('/rooms/:id', async (req, res) => {
  try {
    const roomId = req.params.id;
    const ownerId = req.user._id; // Assuming req.user contains user information

    const room = await Room.findOne({ _id: roomId, ownerId });

    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }

    const { title, description } = req.body;

    room.title = title || room.title;
    room.description = description || room.description;

    const updatedRoom = await room.save();

    res.status(200).json({
      message: 'Room Updated!',
      room: updatedRoom,
    });
  } catch (err) {
    errorResponse(res, err);
  }
});

// Delete a room by ID
router.delete('/rooms/:id', async (req, res) => {
  try {
    const roomId = req.params.id;
    const ownerId = req.user._id; // Assuming req.user contains user information

    const room = await Room.findOne({ _id: roomId, ownerId });

    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }

    await room.remove();

    res.status(200).json({ message: 'Room deleted' });
  } catch (err) {
    errorResponse(res, err);
  }
});

module.exports = router;