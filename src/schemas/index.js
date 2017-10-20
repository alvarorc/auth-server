import { makeExecutableSchema } from 'graphql-tools';
import User from './user';

const RootQuery = `
  type RootQuery {
    user(id: ID!): User
  }
`;

const SchemaDefinition = `
  schema {
    query: RootQuery
  }
`;

export default makeExecutableSchema({
  typeDefs: [
    SchemaDefinition,
    RootQuery,
    User,
  ],
  resolvers: {
    RootQuery: {
      user: (parent, args) => {
        console.log(parent, args);
        return {
          id: args.id,
          username: 'alvaro.rc',
          firstName: 'alvaro',
          lastName: 'rago',
          password: 'ascjascnj',
          email: 'alvarorc.sistemas@gmail.com',
        };
      },
    },
  },
});
