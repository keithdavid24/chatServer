const router = require('express').Router();
const Message = requrie('../models/messages.model');
const validateSession = require('../middleware/validateSession');

function errorResponse(res, err) {
  res.status(500).json({ ERROR: err.message });
}

//create a message for each room //we need room, owner, and message 
router.post("/newMessage/:room_id", validateSession, async (req, res) =>{
  try {
    const text = req.body
    const roomId = req.params.room_id
    const ownerId = req.params._id
    const message = new Message({
      text,
      roomId,
      ownerId,
    });
    await message.save(); 
  } catch (err){
    errorResponse(res,err);
  } 
});
                
//get all messages per room
router.get("/:rooms", async (req,res) => {
  try {
    
  }
});

//update message //PATCH
router.patch()

//delete messages //messages should only be updated and deleted by the owner
router.delete("/:id", async (req, res) =>{
  if (){

  }
});

module.exports = router;