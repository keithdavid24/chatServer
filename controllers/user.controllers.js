const router = require("express").Router();

const User = require("../models/users.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// User Signup

router.post('/signup', async (req, res) => {
    
    try{
       const user = new User({
        userName: req.body.userName,
        email: req.body.email,

        password: bcrypt.hashSync(req.body.password, 12)
        
       })
       const newUser = await user.save();

       const token = jwt.sign({
           id: newUser['_id']},process.env.JWT, {expiresIn: '1 day'});
           
        res.status(200).json({
            user: newUser,  
            message: 'Success! User Created!',
            token
        })
        
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
   
}catch(err){
    res.status(500).json(err);

}
})
module.exports = router;

router.post("/signup", async (req, res) => {
  try {
    const user = new User({
      userName: req.body.userName,
      email: req.body.email,

      password: bcrypt.hashSync(req.body.password, 12),
    });
    const newUser = await user.save();
    const token = jwt.sign({ id: newUser["_id"] }, process.env.JWT, {
      expiresIn: "1 day",
    });
    res.status(200).json({
      user: newUser,
      message: "Success! User Created!",
      token,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({email});
    if (!user) throw new Error("Email or Password does not match");
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT,
      { expiresIn: "1 day" }
    );
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) throw new Error('Email or Password does not match');

    res.status(200).json({
      message: "Successful Login!",
      user,
      token,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;

