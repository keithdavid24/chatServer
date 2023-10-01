const User = require('../models/users.model');

async function validateSession(req, res, next) {
    try {
        const user = await User.findById(req.user.id);

        if(!user) throw new Error('User not found');
        console.log(user);

        req.user = user;
        return next();
    

    }catch(err) {
        return res.status(403).json({ message: err.message });
    }
}
module.exports = validateSession;