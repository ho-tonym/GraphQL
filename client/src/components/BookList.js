import React, { Component } from 'react'
import { ListGroup } from 'react-bootstrap'
import { graphql } from 'react-apollo'
import { getBooksQuery } from '../queries/queries';

import BookDetails from './BookDetails';

class BookList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null,
    }
  }

  displayBooks() {
    const { data } = this.props
    if(data.loading) {
      return(<ListGroup.Item>Loading books...</ListGroup.Item>)
    }
    return data.books.map(book => (
      <ListGroup.Item
        key={book.id}
        onClick={() => this.setState({ selected: book.id })}
      >
        { book.name }
      </ListGroup.Item>
    ))
  }

  render() {
    const { selected } = this.state
    return (
      <>
        <ListGroup className="BookList">
          {this.displayBooks()}
        </ListGroup>

        <hr />
        <BookDetails bookId={selected} />
      </>
    )
  }
}

export default graphql(getBooksQuery)(BookList)
