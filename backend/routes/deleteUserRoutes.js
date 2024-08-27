const express = require('express');
const router = express.Router();
const User = require('../models/user');
const authMiddleware = require('../middleware/auth'); 


router.delete('/deleteUser', authMiddleware, async (req, res) => {
    try {
        const { userId } = req.body;
        console.log('Deleting user with ID:', userId);

        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        const result = await User.findByIdAndDelete(userId);
        console.log('Delete result:', result);

        if (!result) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


module.exports = router;
