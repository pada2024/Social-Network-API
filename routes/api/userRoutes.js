const express = require('express');
const router = express.Router();
const { User } = require('../../models/');

// Function to create a new user
const createUser = async (req, res) => {
    try {
        const newUser = await User.create(req.body); // Create a new user instance
        console.log('User created successfully:', newUser);
        res.json(newUser);
    } catch (error) {
        console.error('Error creating user:', error);
    }
};

// Example user data
const userData = {
    username: 'newUser123',
    email: 'newuser@example.com',
    thoughts: [], // Initially empty array
    friends: [],  // Initially empty array
};

// Function to get all users
const getAllUsers = async (req, res) => {

    try {
        const users = await User.find(); // This retrieves all users
        console.log(users);
        res.json(users);

    } catch (error) {
        console.error('Error retrieving users:', error);
    }
};

// Function to get a single user by _id
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId)
            // .populate('thoughts') // Populate the thoughts field
            // .populate('friends'); // Populate the friends field

        if (!user) {
            console.log('User not found');
            return;
        }

        console.log(user);
        res.json(user);
    } catch (error) {
        console.error('Error retrieving user:', error);
    }
};


// /api/users
router.route("/").get(getAllUsers).post(createUser);

// /user/id
router.route("/:userId").get(getUserById)


// GET route to find a user by ID and return their friend count
// router.get('/api/users/:userId', (req, res) => {
//     const userId = req.params.userId;

//     User.findById(userId)
//         .populate('friends') // Optionally populate friends if needed
//         .then(user => {
//             if (!user) {
//                 return res.status(404).json({ message: 'User not found' });
//             }
//             res.json({
//                 username: user.username,
//                 email: user.email,
//                 friendCount: user.friendCount, // Access the virtual property
//             });
//         })
//         .catch(err => {
//             console.error(err);
//             res.status(500).json({ message: 'Server error' });
//         });
// });

module.exports = router;