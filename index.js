const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const app = new express();

const passport = require('passport');
const passportJWT = require('passport-jwt');
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;

const opts = { 
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), 
    secretOrKey: process.env.SECRET_OR_KEY
}
const strategy = new JwtStrategy(opts, (payload, next) => {
    const user = null;
    next(null, user)
})
passport.use(strategy)
app.use(passport.initialize())

app.get('/', (req, res) => {
    res.send('Hey Hello');
})

const PORT = process.env.PORT || 5000;

app.listen(PORT);