import React, { Component } from 'react'
import { gql } from 'apollo-boost'
import { graphql } from 'react-apollo'
// construct query,
// bind query to component, so that component has access to data from query

const getBooksQuery = gql`
  {
    books {
      name
      id
    }
  }
`

class BookList extends Component {
  displayBooks() {
    const { data } = this.props
    if(data.loading) {
      return(<div>Loading books...</div>)
    }
    return data.books.map(book => (
      <li key={book.id}>{book.name}</li>
    ))
  }

  render() {
    return (
      <ul className="BookList">
        {this.displayBooks()}
      </ul>
    )
  }
}

export default graphql(getBooksQuery)(BookList)
