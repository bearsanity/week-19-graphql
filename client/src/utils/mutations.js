import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation Mutation($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
     token
     user {
      _id
      email
      savedTitles {
        plot
        imdbID
        imdbLink
        imdbRating
        poster
        title
        type
        year
      }
      titleCount
      username
    }
  }
}
`;

export const LOGIN = gql`
    mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
            _id
            email
            savedTitles {
                imdbID
                imdbLink
                imdbRating
                plot
                poster
                title
                type
                year
            }
            titleCount
            username
            }
        }
}
`;

export const REMOVE_TITLE = gql`
    mutation RemoveTitle($imdbId: ID!) {
        removeTitle(imdbID: $imdbId) {
            _id
            email
            savedTitles {
                imdbID
                imdbLink
                imdbRating
                plot
                poster
                title
                type
                year
            }
            titleCount
            username
        }
}
`;

export const SAVE_TITLE = gql`
    mutation SaveTitle($input: TitleInput!) {
        saveTitle(input: $input) {
            _id
            email
            savedTitles {
                imdbID
                title
                year
                type
                poster
                plot
                imdbRating
                imdbLink
            }
            titleCount
            username
        }
    }
`;