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

export const findUsers = () => UserModel.findAsync({});

export const findUserByUserName = (parent, { username }) => UserModel.findOneAsync({ username });

export const createUser = async (parent, args) => (new UserModel(args)).save();

export default User;
