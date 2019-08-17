import React, { Component } from 'react'
import { gql } from 'apollo-boost'
import { graphql } from 'react-apollo'

const getAuthorsQuery = gql`
  {
    authors {
      name
      id
    }
  }
`

class AddBook extends Component {
  displayAuthors() {
    const { data } = this.props
    if(data.loading) {
      return(<option disabled>Loading authors</option>)
    }
    return data.authors.map(author => (
      <option key={author.id} value={author.id}>{author.name}</option>
    ))
  }
  render() {
    return(
      <form id="add-book">
        <div className="field">
          <label htmlFor="bookName">
            Book name:
            <input type="text" id="bookName" />
          </label>
        </div>
        <div className="field">
          <label htmlFor="genre">
            Genre:
            <input type="text" id="bookName" />
          </label>
        </div>
        <div className="field">
          <label htmlFor="author">
            Author:
            <select id="author">
              <option>Select author</option>
              {this.displayAuthors()}
            </select>
          </label>
        </div>
        <button type="button">+</button>
      </form>
    )
  }
}

export default graphql(getAuthorsQuery)(AddBook)
