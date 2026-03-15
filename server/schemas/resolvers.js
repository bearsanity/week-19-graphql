// import user model
const { User } = require('../models');
// import sign token function from auth
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (!context.user) {
                throw new Error("You must be logged in.");
            } else {
                return User.findOne({ _id: context.user._id });
            }
        },
    },
    Mutation: {
        login: async (parent, args, context) => {
            const user = await User.findOne({ email: args.email });
            if (!user) {
                throw new Error("Can't find this user");
            }
            const correctPassword = await user.isCorrectPassword(args.password);
            if (!correctPassword) {
                throw new Error('Wrong password!');
            }
            const token = signToken(user);
            return { token, user };
        },

        // Create new user 
        addUser: async (parent, args, context) => {
            const user = await User.create(args);
            if (!user) {
                throw new Error('Something went wrong.');
            }
            const token = signToken(user);
            return { token, user };
        },

        // Save title to user
        saveTitle: async (parent, args, context) => {
            if (!context.user) {
                throw new Error('You must be logged in.')
            }
            try {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { savedTitles: args.input } },
                    { new: true, runValidators: true }
                );
                return updatedUser;
            } catch (err) {
                throw new Error;
            }
        },

        // Remove title from user
        removeTitle: async (parent, args, context) => {
            if (!context.user) {
                throw new Error('You must be logged in.')
            }
            try {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedTitles: { imdbID: args.imdbID } } },
                    { new: true, runValidators: true }
                );
                return updatedUser;
            } catch (err) {
                throw new Error;
            }

        },
    },
};

module.exports = resolvers;