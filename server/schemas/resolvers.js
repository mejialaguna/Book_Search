const User = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select("-__v -password")
          .populate("savedBooks");

        return userData;
      }
      throw new AuthenticationError("Not logged in");
    },
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { user, token };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);
      return { token, user };
    },
    saveBook: async (parent, args, context) => {
      console.log(args)
      if (context.user) {
        const savedBooks = await User.findByIdAndUpdate(
          context.user._id, //just using the context id no like line 53
          { $push: { savedBooks: args.savedBook } }, //not the type , but the data
          { new: true }
        );
        return savedBooks;
      }
    },
    removeBook: async (parent, { bookId }, context) => {
      if (context.user) {
        const deleteBook = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: { bookId: bookId } } },
          { new: true, runValidators: true }
        ).populate("savedBooks");
        return deleteBook;
      }
    },
  },
};
module.exports = resolvers;
