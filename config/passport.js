import 'dotenv/config';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import bcrypt from 'bcrypt';
import JWTstrag from 'passport-jwt';
import ExtracJWT from 'passport-jwt';
import { check, validationResult } from 'express-validator/check';
import User from '../models/User';
import GoogleStrategy from 'passport-google-oauth20';

const JWTstrategy = JWTstrag.Strategy;
const ExtractJWT = ExtracJWT.ExtractJwt;
const Local = LocalStrategy.Strategy;
const GoogleSta = GoogleStrategy.Strategy;

const opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme('JWT'),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  'jwt',
  new JWTstrategy(opts, (jwt_payload, done) => {
    try {
      User.forge({ username: jwt_payload.id })
        .fetch()
        .then((user) => {
          if (user) {
            console.log('user found in db in passport');
            done(null, user);
          } else {
            console.log('user not found in db');
            done(null, false);
          }
        });
    } catch (err) {
      done(err);
    }
  }),
);

passport.use(
  new GoogleSta(
  {
  clientID: process.env.clientID,
  clientSecret: process.env.secret,
  callbackURL: 'http://localhost:3000/users/auth/google/callback',
  // proxy: true
  }, (token, tokenSecret, profile, done) => {

    console.log(profile);
    User.forge({ googleId: profile.id}).fetch()
      .then( (err) => {
        if(profile){  
          return done(null, profile);
         
        }else{
          const googleUser = new User({
            googleId: profile.id,
            email:profile.emails[0].value
          });

          googleUser.save().then( user => done(null, user))

        }
      })

   }
))

passport.use(
  'register',
  new Local(
    {
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true,
      session: false,
    },
    (req, username, password, done) => {
      try {
        User.forge({ username }, { email: req.body.email })
          .fetch()
          .then((user) => {
            if (user != null) {
              console.log('username or email already taken');
              return done(null, false, {
                message: 'username or email already taken',
              });
            }
            bcrypt.hash(password, 12).then((hashedPassword) => {
              const user = new User({
                username: req.body.username,
                password: hashedPassword,
                email: req.body.email,
              });
              user.save().then(() => done(null, user));
            });
          });
      } catch (err) {
        return done(err);
      }
    },
  ),
);

passport.use(
  'login',
  new Local(
    {
      usernameField: 'username',
      passwordField: 'password',
      session: false,
    },
    (username, password, done, req) => {
      try {
        User.forge({ username })
          .fetch()
          .then((user) => {
            if (user === null) {
              return done(null, false, { message: "Username doesn't exist" });
            }

            bcrypt
              .compare(password, user.attributes.password)
              .then((response) => {
                if (response !== true) {
                  console.log('passwords do not match');
                  return done(null, false, {
                    message: 'passwords do not match',
                  });
                }
                console.log('user found & authenticated');
                return done(null, user);
              });
          });
      } catch (err) {
        done(err);
      }
    },
  ),
);

// Google Stategy

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((user, done) => {
  User.forge({ id: user })
    .fetch()
    .then((usr) => {
      done(null, usr);
    })
    .catch((err) => {
      done(err);
    });
});
