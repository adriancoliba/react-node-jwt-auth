const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const app = new express();
const parser = require('body-parser');
const knex = require('./knex/knex.js');

const bookshelf = require('bookshelf')(knex);
const securePassword = require('bookshelf-secure-password');
bookshelf.plugin(securePassword)
// set up a plugin for secure password. it will take anything thats password and autoincript it.

const User = bookshelf.Model.extend({
    tableName: 'login_user', 
    hasSecurePassword: true
}); // We've created a user model that has a secure password (it's used from the plugin above)


const passport = require('passport');
const passportJWT = require('passport-jwt');
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;
const jwt = require('jsonwebtoken');

const opts = { 
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), 
    secretOrKey: process.env.SECRET_OR_KEY
}
const strategy = new JwtStrategy(opts, (payload, next) => {
    User.forge({id: payload.id}).fetch().then(res => {
        next(null, res)
    })
})
passport.use(strategy)

app.use(passport.initialize())
app.use(parser.urlencoded({ extended: false }))
app.use(parser.json())

app.get('/', (req, res) => {
    res.send('Hey Hello');
})
app.post('/seedUser', (req, res) => {
    if (!req.body.email || !req.body.password) {
      return res.status(401).send('no fields');
    }
    const user = new User({
      email: req.body.email,
      password: req.body.password
    });

    user.save().then(() => {
      res.send('ok');
    });
});
app.post('/getToken', (req, res) => {
    if(!req.body.email || !req.body.password) {
        return res.status(401).send('Fields not sent')
    }
    User.forge({ email: req.body.email }).fetch().then(result => {
        if(!result){
            return res.status(400).send('User not found')
        }
        result.authenticate(req.body.password).then(user => {
            const payload = {id: user.id};
            const token = jwt.sign(payload, process.env.SECRET_OR_KEY);
            res.send(token)
        }).catch(err => {
            return res.status(401).send({err: err})
        })
    })
})
app.get('/protected', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.send('I am protected')
})
app.get('/getUser', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.send(req.user)
})
const PORT = process.env.PORT || 5000;

app.listen(PORT);
