import express from 'express';
import User from '../models/User';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import {check, validationResult } from 'express-validator/check';
const router = express.Router();


// var corsOptions = {
//     origin: 'http://localhost:3000',
//     optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// }

router.get('/', (req, res) => {
    User.forge().fetchAll().then((users) => {
        res.json(users.toJSON());
    });
});

router.post('/register', [
    check('password').isLength({ min: 6 }).withMessage('must be at least 6 chars long'),
    check('username').custom( value => {
        return User.forge({ username: value}).fetch().then( user => {
            if(user){
                return Promise.reject('Username already in use');
            }
        })
    }),
    check('email').custom( value => {
        return User.forge({ email: value}).fetch().then( user => {
            if(user){
                return Promise.reject('Email already in use');
            }
        })
    })
],
 (req, res, next) => {
    //  validating BEFORE A USER IS CREATED
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ error: errors.array() })
    }
    // then here a user is created. 
    passport.authenticate('register', (err, user, info) => {
        if(err){
            console.log(err)
        }
        if(info !== undefined){
            console.log(info.message)
            res.status(403).send(info.message)
        }else{
            req.logIn(user, err  => {
                const data = {
                    username: req.body.username.trim(), 
                    password: req.body.password.trim(),
                    email: req.body.email.trim()
                }
                // console.log(data);
                // debugger;
                User.forge({
                    username: data.username
                }).fetch().then( user => {
                    const token = jwt.sign({ id: user.id  }, process.env.JWT_SECRET);
                    jwt.verify(token, process.env.JWT_SECRET, function(err, data){
                        console.log(err, data);
                    })
                    console.log('user created in db');
                    res.status(200).send({
                        message: 'user created', 
                        token: token, 
                        auth: true  
                    });
                
                });
            })
        }
    })(req, res, next);
});

router.get("/current_user", (req, res) => {
    if(req.user){
      res.status(200).send({ user: req.user});
    } else {
      res.json({ user:null})
    }
  
});

router.post('/auth/google',  
    passport.authenticate('google', { scope: ['profile', 'email']}),  (req, res, next) => {
        User.forge({ email:req.body.email}).fetch().then( user => {
            // if user already exists,redirect
            if(user){
                res.send({
                    user: user,
                    success:true
                })
            } else{
                jwt.sign({ id: user.id}, process.env.JWT_SECRET, {expiresIn: 4800}, (err, token) => {
                    res.json({
                        success:true, 
                        token: token
                    })
                });
            }
        })
});

// router.post('/auth/google',passport.authenticate('google', { scope: ['profile', 'email'] }));

// router.get('/auth/google/callback', 
//   passport.authenticate('google', { successRedirect:'http://localhost:3001', failureRedirect: '/login' }),
//    (req, res) => {  
//             res.json({
//                 success:true, 
//             })
      
//   }); 

  
router.post('/login', passport.authenticate('login', {session:true}), (req, res, next) => {
   passport.authenticate('login', (err, user, info) => {
       if(err){
           console.log(err);
       }
       if(info !== undefined){
           console.log(info.message);
           res.status(401).send(info.message);
       } else{
           req.logIn(user, err =>{
               User.forge({
                   username:req.body.username
               }).fetch().then( user => {
                    const token = jwt.sign({ id: user.id}, process.env.JWT_SECRET);
                    jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
                        console.log(err, data);
                    })
                    res.status(200).send({
                        auth:true, 
                        token: token, 
                        message: 'user found & logged in'
                    })
                })
           })
       }

   })(req, res, next);
})

router.get("/current_user", (req, res) => {
    if(req.user){
      res.status(200).send({ user: req.user});
    } else {
      res.json({ user:null})
    }
  });

router.get('/logout', (req, res) => {
    req.logOut();
    res.status(200).send('user logged out')
})

export default router;