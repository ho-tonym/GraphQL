import React from 'react';
import BookList from './components/BookList';
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo';
//apollo client setup
const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql'
});

// ApolloProvider - get data from endpoint and inject into provider
function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <h1>Reading List</h1>
        <BookList />
      </div>
    </ApolloProvider>
  );
}

export default App;
