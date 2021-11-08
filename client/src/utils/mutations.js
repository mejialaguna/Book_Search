import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: email!, $password: password!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: username!, $email: email!, $password: password!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const REMOVE_BOOK = gql`
  mutation removeBook($id: ID!) {
    removeBook(bookId: $id) {
      _id
      username
      email
      bookCount
      savedBooks {
        bookId
        title
        authors
        description
        image
        link
      }
    }
  }
`;

export const ADD_BOOK = gql`
  mutation saveBook($input: savedBooks!) {
    saveBook(savedBook: $input) {
      _id
      username
      email
      bookCount
      savedBooks {
        bookId
        title
        authors
        description
        image
        link
      }
    }
  }
`;

export default { LOGIN_USER, ADD_USER, ADD_BOOK, REMOVE_BOOK };
