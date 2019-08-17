const express = require('express');
const graphqlHTTP = require('express-graphql');
const cors = require('cors')
const mongoose = require('mongoose');
const schema = require('./schema/schema');

const app = express();
const mongoURI = process.env.MONGODB_URI || require('./config/keys').mongoURI

app.use(cors())

mongoose.connect(mongoURI, { useNewUrlParser: true })

// bind express with graphql
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));

app.listen(4000, () => {
  console.log('now listening for requests on port 4000');// eslint-disable-line no-console
});
