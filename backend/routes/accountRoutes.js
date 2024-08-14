const express = require('express');
const router = express.Router();
const User = require('../models/user');
const auth = require('../middleware/auth')

// Change POST to GET
router.get('/api/user/:id/fees', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        // Send the required fields in the response
        res.json({
            tuitionFees: user.tuitionFees,
            creditHours: user.creditHours
        });

    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;