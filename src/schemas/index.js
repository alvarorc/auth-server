import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolvers';
import User from './user';

const RootQuery = `
  type RootQuery {
    user(username: String!): User!
    users: [User!]!
    auth(username: String!, password: String!): String!
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
  resolvers,
});
