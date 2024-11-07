const { Schema, model, Types } = require('mongoose');

// Schema to create Thought model
const reactionSchema = new Schema(
    {
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(), // Set default value to a new ObjectId
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280, // Maximum length of 280 characters
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now, // Set default value to the current timestamp
        get: (timestamp) => {
            return new Date(timestamp).toLocaleString(); // Format the timestamp on query
        },
    },
});

// Main Thought schema
const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1, // Minimum length of 1 character
        maxlength: 280, // Maximum length of 280 characters
    },
    createdAt: {
        type: Date,
        default: Date.now, // Set default value to the current timestamp
        get: (timestamp) => {
            return new Date(timestamp).toLocaleString(); // Format the timestamp on query
        },
    },
    username: {
        type: String,
        required: true, // The user that created this thought
    },
    reactions: [reactionSchema], // Array of nested documents using the reactionSchema
});

// Create a virtual for reactionCount
thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

// Set strictPopulate to false
thoughtSchema.set('strictPopulate', false);

// Create the Thought model
const Thought = model('Thought', thoughtSchema);

module.exports = Thought;

