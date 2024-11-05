const mongoose = require('mongoose');
const connection = require('../config/connection');
const { User, Thought } = require('../models');
// const { Schema, model } = require('mongoose');


mongoose.connect('mongodb://localhost/socialNetworkDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSeed = [
  {

    username: "lernantino",
    email: 'lern@example.com',
    thoughtText: "Here's a cool thought...",
    userId: "5edff358a0fcb779aa7b118b",
    friends: []
  },

  {
    username: "geronimo",
    email: 'germo@example.com',
    thoughtText: "OMG, I am soooo happy today!...",
    userId: "5edff358a0fcb779aa7b118b",
    friends: []
  },
];

const thoughtSeed = [
  {
    thoughtText: "Excited to start my new job!",
    createdAt: new Date(),
    username: "lernantino",
    reactions: [],
  },
  {
    thoughtText: "Just finished a great book!",
    createdAt: new Date(),
    username: "geronimo",
    reactions: [],
  },
];

const seedDatabase = async () => {
  try {
    // Clear existing data
    await db.User.deleteMany({});
    await db.Thought.deleteMany({});

    // Add new users
    const users = await db.User.insertMany(userSeed);
    console.log('Users seeded:', users);

    // Add thoughts and associate with users
    const thoughtsWithUserIds = thoughtSeed.map(thought => ({
      ...thought,
      userId: users.find(user => user.username === thought.username)._id,
    }));
    const thoughts = await db.Thought.insertMany(thoughtsWithUserIds);
    console.log('Thoughts seeded:', thoughts);

  } catch (error) {
    console.error('Error seeding the database:', error);
  } finally {
    mongoose.connection.close();
  }
};

seedDatabase();
