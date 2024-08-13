const express = require('express');
const router = express.Router();
const User = require('../models/user');
const auth = require('../middleware/auth');

// Get username
router.get('/:id', auth, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ username: user.username });
    } catch (error) {
        console.error('Error fetching username:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update username
router.put('/', auth, async (req, res) => {
    try {
        const { username } = req.body;
        const user = await User.findById(req.user.id); // Ensure req.user is set by auth middleware
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.username = username;
        await user.save();

        res.json({ message: 'Username updated successfully' });
    } catch (error) {
        console.error('Error updating username:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
