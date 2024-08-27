const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const auth = require('../middleware/auth');

router.put('/editUser', auth, async (req, res) => {
    const { userId, newUsername, newEmail, newFees } = req.body;

    try {
        let user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.username = newUsername || user.username;
        user.email = newEmail || user.email;
        user.tuitionFees = newFees || user.tuitionFees;

        await user.save();

        res.json({ message: 'User updated successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
