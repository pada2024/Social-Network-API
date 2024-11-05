const { Schema, model } = require('mongoose');

// Schema to create user model
const userSchema = new Schema(
  {
    first: {
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
      required: true,
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

const User = model('user', userSchema);

module.exports = User;