const router = require('express').Router();

const User = require('../models/users.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// User Signup
router.post('/signup', async (req, res) => {
    try{
       const user = new User({
        userserName: req.body.UserName,
        email: req.body.email,

        password: bcrypt.hashSync(req.body.password, 12)
        
       })
       const newUser = await user.save();
    }
    catch(err){
        res.status(500).json(err);
    }
    
});
    
router.post('/login', async (req, res) => {
try{
    const {email, password} = req.body;
   const user = await User.findOne({email, password});
   if(!user) throw new Error('Email or Password does not match');
   const token = jwt.sign({
       id: user._id,},
       process.env.JWT,{expiresIn: '1 day'})
       
    res.status(200).json({
        message: 'Successful Login!',
        user,
        token
        });
    res.status(200).json(user);
}catch(err){
    res.status(500).json(err);
}
})
module.exports = router;