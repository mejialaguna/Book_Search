const { User } = require("../models");
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

  Mutations: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { user, token };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError("wrong username");
      }
      const correctPw = await User.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError("wrong password");
      }
      const token = signToken(user);
      return { user, token };
    },
    removeBook: async (parent, { bookId }, context) => {
      if (context.user) {
        const deleteBook = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: { bookId: bookId } } },
          { new: true, runValidators: true }
        ).populate("savedBooks");
      }
    },
  },
};

