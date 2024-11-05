const express = require('express');
const router = express.Router();
const {User} = require('../../models/'); 

// GET route to find a user by ID and return their friend count
router.get('/api/users/:userId', (req, res) => {
    const userId = req.params.userId;

    User.findById(userId)
        .populate('friends') // Optionally populate friends if needed
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json({
                username: user.username,
                email: user.email,
                friendCount: user.friendCount, // Access the virtual property
            });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: 'Server error' });
        });
});

module.exports = router;