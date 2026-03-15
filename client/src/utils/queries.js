import { gql } from '@apollo/client';

export const QUERY_ME = gql`
query me {
    me {
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