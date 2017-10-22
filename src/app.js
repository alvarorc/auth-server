import express from 'express';
import path from 'path';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import authorization from './authorization';
import schema from './schemas';
import index from './routes';
import { notFoundHandler, generalErrorHandler } from './serverErrorsHandler';

// setup express into app variable
const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.set('view engine', 'pug');

app.set('views', path.join(__dirname, '../views'));
app.use(express.static(path.join(__dirname, '../public')));

// index route with basic info
app.use('/', index);

// set apollo graphql api
app.use(
  '/graphql',
  bodyParser.json(),
  authorization,
  graphqlExpress(req => ({ schema, context: { user: req.user } })),
);
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

// catch 404 and forward to error handler
app.use(notFoundHandler);

// error handler
app.use(generalErrorHandler);

export default app;
