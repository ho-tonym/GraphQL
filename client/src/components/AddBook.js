import React, { Component } from 'react'
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
      <form id="add-book" onSubmit={this.submitForm}>
        <div className="field">
          <label htmlFor="bookName">
            Book name:
            <input type="text" id="bookName" onChange={this.handleNameChange} />
          </label>
        </div>
        <div className="field">
          <label htmlFor="genre">
            Genre:
            <input type="text" id="bookName" onChange={this.handleGenreChange} />
          </label>
        </div>
        <div className="field">
          <label htmlFor="author">
            Author:
            <select id="author" onChange={this.handleAuthorChange}>
              <option>Select author</option>
              {this.displayAuthors()}
            </select>
          </label>
        </div>
        <button type="submit">+</button>
      </form>
    )
  }
}

// export default graphql(getAuthorsQuery)(AddBook)
export default compose(
  graphql(getAuthorsQuery, { name: "getAuthorsQuery" }), // name is needed to attatch
  graphql(addBookMutation, { name: "addBookMutation" }),
  // this.props.data is split into these 2 properties named
  // getAuthorsQuery
  // addBookMutation
)(AddBook);
