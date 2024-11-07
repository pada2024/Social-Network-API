const express = require('express');
const router = express.Router();
const { Thought } = require('../../models/');

// Function to create a new thought
const createThought = async (req, res) => {
    try {
        const newThought = await Thought.create(req.body);
        console.log('Thought created successfully:', newThought);
        res.json(newThought);
    } catch (error) {
        console.error('Error creating thought:', error);
        return res.status(500).json({ message: 'Error creating thought' });
    }
};

// Function to get all thoughts
const getAllThoughts = async (req, res) => {
    try {
        const thoughts = await Thought.find();
        console.log("we are here", thoughts);
        res.json(thoughts);
    } catch (error) {
        console.error('Error retrieving thoughts:', error);
        return res.status(500).json({ message: 'Error retrieving thoughts' });
    }
};

// Function to get a single thought by _id
const getThoughtById = async (req, res) => {
    try {
        const thought = await Thought.findById(req.params.thoughtId)
            .populate('thoughts')
            .populate('friends');
        if (!thought) {
            console.log('Thought not found');
            return res.status(404).json({ message: 'Thought not found' });
        }
        console.log(thought);
        res.json(thought);
    } catch (error) {
        console.error('Error retrieving thought:', error);
        return res.status(500).json({ message: 'Error retrieving thought' });
    }
};

// Function to update a thought by its _id
const updateThoughtById = async (req, res) => {
    try {
        const updatedThought = await Thought.findByIdAndUpdate(
            req.params.thoughtId, // The ID of the thought to update
            req.body, // The data to update
            { new: true, runValidators: true } // Options: return the updated document and run validators
        );

        if (!updatedThought) {
            return res.status(404).json({ message: 'Thought not found' });
        }

        res.json(updatedThought); // Send back the updated thought
    } catch (error) {
        console.error('Error updating thought:', error);
        res.status(500).json({ message: 'Error updating thought' });
    }
};


// Function to delete a thought by its _id
const deleteThoughtById = async (req, res) => {
    try {
        const deletedThought = await Thought.findByIdAndDelete(req.params.thoughtId); // Find and delete the thought by its _id

        if (!deletedThought) {
            return res.status(404).json({ message: 'Thought not found' });
        }

        res.json({ message: 'Thought deleted successfully' }); // Send a success message
    } catch (error) {
        console.error('Error deleting thought:', error);
        res.status(500).json({ message: 'Error deleting thought' });
    }
};

// Routes Defined
router.route("/")
    .get(getAllThoughts)
    .post(createThought);

router.route("/:thoughtId")
    .get(getThoughtById)
    .put(updateThoughtById) 
    .delete(deleteThoughtById); 

module.exports = router;