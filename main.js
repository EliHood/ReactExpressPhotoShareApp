import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import logger from 'morgan';
import path from 'path';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import session from 'express-session';
import './config/passport';
import knex from 'knex';
import KnexSessionStore from 'connect-session-knex';
import config from './knexfile';
import imageRoute from './routes/images';
import userRoute from './routes/users';

const PORT = process.env.PORT || 3000;
const knexSession = KnexSessionStore(session);
const herokuOrNot = process.env.NODE_ENV !== 'production'
  ? config.development
  : config.production;
const myKnex = knex(herokuOrNot);
const store = new knexSession({
  knex: myKnex,
  // tablename:'sessions'
});
const app = express();
// declare this build before routes and stuff. else it wont go to the routes.
app.use(cookieParser());
app.use(bodyParser.json());
app.use(
  cors({
    origin: process.env.ALLOW_ORIGIN,
    preflightContinue: true,
    credentials: true,
    allowedHeaders: 'X-Requested-With, Content-Type, Authorization',
    methods: 'GET, POST, PATCH, PUT, POST, DELETE, OPTIONS',
    exposedHeaders: ['Content-Length', 'X-Foo', 'X-Bar'],
  }),
);

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

app.use(logger('dev'));

// For React Stuff if need be
//

// you need body parser urlencoded so passport will not give a Missing Credentials error
app.use(
  session({
    store: store,
    saveUninitialized: false,
    resave:false,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000,  }, // 30 days
    secret: process.env.JWT_SECRET,
  }),
);
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.urlencoded({ extended: false }));

// call this line before routes

app.use(express.static(path.join(__dirname, 'client', 'build')));

app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.use('/users', userRoute);
app.use('/images', imageRoute);

// call this line of code after the routes.
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

app.use(() => (req, res, next) => {
  res.locals.user = req.user; // This is the important line
  // req.session.user = user
  console.log(res.locals.user);
  next();
});
app.use('/', (req, res, next) => {
  let n = req.session.views || 0;
  req.session.views = ++n;
  res.end(`${n} views`);
  console.log(n);
});

// module.parent prevents the
// Node / Express: EADDRINUSE, Address already in use error when unit testing
if (!module.parent) {
  app.listen(PORT, () => console.log(`Example app listening on port ${process.env.PORT}!`));
}
export default app;
