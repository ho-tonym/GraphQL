import React, { Component } from 'react'
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
    let { data } = this.props
    if(data.loading) {
      return(<div>Loading books...</div>)
    }
    return data.books.map(book => (
      <li key={ book.id } onClick={ (e) => this.setState({ selected: book.id }) }>{ book.name }</li>
    ))
  }

  render() {
    const { selected } = this.state
    return (
      <>
        <ul className="BookList">
          {this.displayBooks()}
        </ul>
        <BookDetails bookId={selected} />
      </>
    )
  }
}

export default graphql(getBooksQuery)(BookList)
