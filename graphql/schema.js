const { buildSchema } = require('graphql');

const schema = buildSchema(`
    type User{
      _id:ID!
      givenName: String!
      familyName: String!
      email: String!
      created: String!
    }
    input UserInputData {
      givenName: String
      familyName: String
      email: String
    }
    type RootQuery {
      user(id: ID!): User!
      users: [User!]!
    }
    type RootMutation {
      createUser(userInput:UserInputData): User!
      updateUser(id: ID!, userInput:UserInputData): User!
      deleteUser(id: ID!): User!
    }
    schema {
      query: RootQuery
      mutation: RootMutation
    }
`);

module.exports = schema;
