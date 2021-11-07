const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]
  }
  type Book {
    _id: ID!
    authors: [String]
    description: String
    bookId: String
    image: String
    link: String
    title: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Input {
    authors: [String]
    description: String
    title: String
    bookId: String
    image: String
    link: String
  }

  type query {
    me: User
  }

  type Mutations {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveBook()
    removeBook(bookId: String!): User
  }
`;
 
module.exports = typeDefs;