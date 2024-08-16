const express = require('express');
const router = express.Router();
const User = require('../models/user'); // Adjust path as needed
const auth = require('../middleware/auth'); // Adjust path as needed

// Route to check if the user is an admin
router.get('/isAdmin', auth, async (req, res) => {
    console.log('admin route hit');
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        return res.json({ isAdmin: user.isAdmin });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
