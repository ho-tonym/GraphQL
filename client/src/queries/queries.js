import { gql } from 'apollo-boost'

export const getAuthorsQuery = gql`
  {
    authors {
      name
      id
    }
  }
`

export const getBooksQuery = gql`
  {
    books {
      name
      id
    }
  }
`
// bind query to component, so that component has access to data from query
export const getBookQuery = gql`
    query ($id: String){
        book(id: $id) {
            id
            name
            genre
            author {
                id
                name
                age
                books {
                    name
                    id
                }
            }
        }
    }
`;

// takes in variable parameters
export const addBookMutation = gql`
  mutation ($name: String!, $genre: String!, $authorId: ID!){
    addBook(name: $name, genre: $genre, authorId: $authorId){
      name
      id
    }
  }
`
