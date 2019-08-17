import React from 'react';
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo';

import BookList from './components/BookList';
import AddBook from './components/AddBook';

// apollo client setup
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
});

// ApolloProvider - get data from endpoint and inject into provider
function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App m-5">
        <h1>Reading List</h1>
        <BookList />
        <hr />
        <AddBook />
      </div>
    </ApolloProvider>
  );
}

export default App;
