const { Schema, model } = require('mongoose');

// Schema to create user model
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Please fill a valid email address'],
    },
    thoughts: {
      type: Schema.Types.ObjectId,
      ref: 'Thought', // Reference to the Thought model
    },

    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User', // Self-reference for friends
    }],

  },
  {
    toJSON: {
      getters: true,
    },
  }
);

// Create a virtual property called friendCount
userSchema.virtual('friendCount').get(function() {
    return this.friends.length; // Return the length of the friends array
});

// Set strictPopulate to false
userSchema.set('strictPopulate', false);

const User = model('User', userSchema);

module.exports = User;