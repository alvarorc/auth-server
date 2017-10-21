import { makeExecutableSchema } from 'graphql-tools';
import User, { findUserByUserName, createUser, findUsers } from './user';

const RootQuery = `
  type RootQuery {
    findUserByUserName(username: String!): User
    findUsers: [User]
  }
`;

const Mutation = `
  type Mutation {
    createUser(username: String!, email: String!, password: String!, firstName: String!, lastName: String!, phoneNumber: String, role: String): User!
  }
`;

const SchemaDefinition = `
  schema {
    query: RootQuery,
    mutation: Mutation
  }
`;

export default makeExecutableSchema({
  typeDefs: [
    SchemaDefinition,
    RootQuery,
    Mutation,
    User,
  ],
  resolvers: {
    RootQuery: {
      findUserByUserName,
      findUsers,
    },
    Mutation: {
      createUser,
    },
  },
});
