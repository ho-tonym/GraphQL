const graphql = require('graphql')
const Book = require('../models/book');
const Author = require('../models/author');

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList, GraphQLNonNull } = graphql

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent) {
        return Book.find({ authorId: parent.id });
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
        return Author.findById(parent.authorId);
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
        return Book.findById(args.id);
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Author.findById(args.id);
      },
    },
    books: {
      type: new GraphQLList(BookType),
      resolve() {
        return Book.find({});
      },
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve() {
        return Author.find({});
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
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        authorId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        const book = new Book({
          name: args.name,
          genre: args.genre,
          authorId: args.authorId,
          // ids are automatically created when submitting data,
          // so we use the correlated author's id in the db
        });
        return book.save();
      },
    },
  },
});

// when author is recieved, whats the return value?
// mutation {
//   addAuthor(name: "Clayton", age:25){
//     name
//     age
//   }
// }

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
})
