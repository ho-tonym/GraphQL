const graphql = require('graphql')
const _ = require('lodash')
const Book = require('../models/book');
const Author = require('../models/author');

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList } = graphql

// dummy data
const books = [
  { name: 'Name of the Wind', genre: 'Fantasy', id: '1', authorId: '1' },
  { name: 'The Final Empire', genre: 'Fantasy', id: '2', authorId: '2' },
  { name: 'The Long Earth', genre: 'Sci-Fi', id: '3', authorId: '3' },
  { name: 'The Long Earth', genre: 'Sci-Fi', id: '3', authorId: '3' },
  { name: 'The Colour of Magic', genre: 'Fantasy', id: '5', authorId: '3' },
  { name: 'The Light Fantastic', genre: 'Fantasy', id: '6', authorId: '3' },
]

const authors = [
  { name: 'Patrick Rothfuss', age: 44, id: '1' },
  { name: 'Brandon Sanderson', age: 42, id: '2' },
  { name: 'Terry Pratchett', age: 66, id: '3' },
]

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent) {
        // return _.filter(books, { authorId: parent.id })
      },
    },
  }),
})


// wrapped in es6 function that return grpahql object
const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent) {
        // return _.find(authors, { id: parent.authorId }) // since we queried the book, we have authorid
      },
    },
  }),
})

// dont need to wrap fields here in a functio because order isnt important
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLString } }, // argumemt when querying a book
      resolve(parent, args) { // parent- realtes to db | args- defined above
        // return _.find(books, { id: args.id })// code to get data from db
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // return _.find(authors, { id: args.id })
      },
    },
    books: {
      type: new GraphQLList(BookType),
      resolve() {
        // return books
      },
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve() {
        // return authors
      },
    },
  },
})
// defines how we can jump into the graph to get data

// book query which can be found in book object type
// {
//   books{
//     name
//     genre
//   }
// }

// mutations determine what can be changed - like post,delete,update
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
      },
      resolve(parent, args) {
        const author = new Author({
          name: args.name,
          age: args.age,
        });
        return author.save();
      },
    },
    addBook: {
      type: BookType,
      args: {
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        authorId: { type: GraphQLID },
      },
      resolve(parent, args) {
        const book = new Book({
          name: args.name,
          genre: args.genre,
          authorId: args.authorId,
        });
        return book.save();
      },
    },
  },
});

//when author is recieved, whats the return value?
mutation {
  addAuthor(name: "Clayton", age:25){
    name
    age
  }
}

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
})
