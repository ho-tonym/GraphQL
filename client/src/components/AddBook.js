import React, { Component } from 'react'
import { Button, Form } from 'react-bootstrap'
import { graphql } from 'react-apollo'
import { flowRight as compose } from 'lodash';
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries';

class AddBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      genre: '',
      authorId: '',
    };
  }

  handleNameChange = (e) => {
    this.setState({ name: e.target.value })
  }

  handleGenreChange = (e) => {
    this.setState({ genre: e.target.value })
  }

  handleAuthorChange = (e) => {
    this.setState({ authorId: e.target.value })
  }

  submitForm = (e) => {
    const { addBookMutation } = this.props
    const { name, genre, authorId } = this.state
    e.preventDefault()
    addBookMutation({
      variables: {
        name,
        genre,
        authorId,
      },
      refetchQueries: [{ query: getBooksQuery }],
      // this query gets books, so when we ad a book
      // we rerun the getBooks Query to update on the client side
    });
  }

  displayAuthors() {
    const { getAuthorsQuery } = this.props
    if(getAuthorsQuery.loading) {
      return(<option disabled>Loading authors</option>)
    }
    return getAuthorsQuery.authors.map(author => (
      <option key={author.id} value={author.id}>{author.name}</option>
    ))
  }

  render() {
    return(
      <Form onSubmit={this.submitForm}>
        <Form.Group controlId="book-name">
          <Form.Label>Book Name</Form.Label>
          <Form.Control type="text" onChange={this.handleNameChange} placeholder="Enter a book name" />
        </Form.Group>
        <Form.Group controlId="genre">
          <Form.Label>Genre</Form.Label>
          <Form.Control type="text" placeholder="Enter a genre" />
        </Form.Group>
        <Form.Group controlId="author">
          <Form.Label>Select author</Form.Label>
          <Form.Control as="select">
            {this.displayAuthors()}
          </Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    )
  }
}

export default compose(
  graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
  graphql(addBookMutation, { name: "addBookMutation" }),
)(AddBook);
// name is needed to attatch to component
// this.props.data is split into these 2 properties named
// getAuthorsQuery
// addBookMutation
// export default graphql(getAuthorsQuery)(AddBook)
