import { merge, mapValues } from 'lodash';
import { resolvers as userResolvers } from './user';

// here we put all resolvers
const resolvers = merge(userResolvers);

const authenticated = resolver => (parent, args, context, info) => {
  if (!context.user) {
    throw new Error('401: User is not authenticated.');
  }
  return resolver(parent, args, context, info);
};

export default mapValues(resolvers, resolver =>
  mapValues(resolver, (item) => {
    if (item.name.match('auth')) {
      return item;
    }
    return authenticated(item);
  }),
); // eslint-disable-line
