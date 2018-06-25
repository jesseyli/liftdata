var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  input MessageInput {
    content: String
    authorId: String
  }

  type Message {
    id: ID!
    content: String
    authorId: ID
  }

  type Query {
    getMessage(id: ID!): Message
  }

  type Mutation {
    createMessage(input: MessageInput): Message
    updateMessage(id: ID!, input: MessageInput): Message
  }
`);

// If Message had any complex fields, we'd put them on this object.
class Message {
  constructor(id, content, authorId) {
    this.id = id;
    this.content = content;
    this.authorId = authorId;
  }
}

function processMessage(message) {
    if (!message) {return null}
    return new Message(message._id, message.content, message.authorId);
  }

var root = {
  getMessage: async function ({ id }) {
    return Messages.findOne({'_id':ObjectId(id)}).then(processMessage)
  },
  createMessage: async function ({ input }) {
    // Create a random id for our "database".
    const r = await Messages.insertOne({'content': input.content, 'authorId': input.authorId})
    return new Message(r.insertedId, input.content, input.authorId);
  },
  updateMessage: async function ({ id, input }) {
    var updatedFields = {}
    if (input.content) {
      updatedFields.content = input.content
    }
    if (input.authorId) {
      updatedFields.authorId = input.authorId
    }
    r = await Messages.findOneAndUpdate({'_id':ObjectId(id)}, {'$set': updatedFields})
    return new Message(id, input.content, input.authorId);
  },
};


var app = express();

const url = 'mongodb://localhost:27017';

var Messages;

// Create the db connection
MongoClient.connect(url, {  
  poolSize: 10
},function(err, client) {
    mongodb=client.db('myproject');
    Messages=mongodb.collection('messages');
    }
);

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));


app.listen(4000, () => {
  console.log('Running a GraphQL API server at localhost:4000/graphql');
});
