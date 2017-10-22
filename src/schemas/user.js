import { signtoken } from '../authorization';
import UserModel from '../models/user';

const User = `
  type User {
    id: ID!
    username: String!
    email: String!
    password: String!
    role: String
    firstName: String!
    lastName: String!
    phoneNumber: String
  }
`;

export const resolvers = {
  RootQuery: {
    users: () => UserModel.findAsync({}),
    user: (parent, { username }) => UserModel.findOneAsync({ username }),
    auth: async (parent, { username, password }) => {
      const user = await UserModel.findOneAsync({ username });
      const hasValidCredentials = (user) ? await user.validatePassword(password) : false;

      if (!hasValidCredentials) {
        return new Error('Invalid credentials');
      }
      return signtoken({ id: user.id });
    },
  },
  Mutation: {
    createUser: (parent, args) => (new UserModel(args)).save(),
  },
};

export default User;
