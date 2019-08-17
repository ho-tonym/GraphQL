import React, { Component } from 'react'
import { ListGroup } from 'react-bootstrap'
import { graphql } from 'react-apollo'
import { getBookQuery } from '../queries/queries'

class BookDetails extends Component {
  displayBookDetails() {
    const { book } = this.props.data
    if(book) {
      return(
        <div>
          <p>
            <b>Title: </b>
            { book.name }
          </p>
          <p>
            <b>Genre: </b>
            { book.genre }
          </p>
          <p>
            <b>Author: </b>
            { book.author.name }
          </p>
          <p>
            <b>All books by this author:</b>
          </p>
          <ListGroup className="other-books">
            { book.author.books.map(item => <ListGroup.Item key={item.id}>{ item.name }</ListGroup.Item>)}
          </ListGroup>
        </div>
      );
    }
    return(<div>No book selected...</div>)
  }
  render() {
    return(
      <div id="book-details">
        { this.displayBookDetails() }
      </div>
    )
  }
}

export default graphql(getBookQuery, {
  options: (props) => ({
    variables: {
      id: props.bookId,
    },
  }),
})(BookDetails)
