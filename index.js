const dotenv = require('dotenv');
dotenv.config();

const mongoose = require('mongoose');
const express  = require('express');
const app = express();

const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');

app.use(session({
    secret: process.env.SECRET || 'verybadsecret',
    resave: false,
    saveUninitialized: false
}));

// Passport initialization
app.use(passport.initialize());
app.use(passport.session());

// Strategy setup
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


const notesRoutes = require('./routes/notes');
const authRoutes = require('./routes/auth')

mongoose.connect('mongodb://127.0.0.1:27017/notes_API')
    .then(() => {
        console.log("Mongo Connection Open")   
    }).catch((err) => {
        console.log("Error", err)
});

app.use(express.json());

app.use('/notes', notesRoutes);
app.use('/', authRoutes);

app.get('/', (req, res)=>{
    res.status(200).json({msg : 'The HomePage'})
});

app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Internal Server Error" } = err;
  res.status(statusCode).json({ error: message });
});

const PORT = process.env.PORT || 3000

app.listen(PORT, ()=>{
    console.log(`App is listening on port ${PORT}`)
});