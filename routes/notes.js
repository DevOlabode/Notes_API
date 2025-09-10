
const express  = require('express');
const router = express.Router();

const Note = require('../models/notes');

const ExpressError  = require('../utils/expressError');
const catchAsync  = require('../utils/catchAsync');

const notes = require('../controllers/notes')

const { isLoggedIn, validateNotes } = require('../middleware');

router.route('/')
    .post(validateNotes, catchAsync(notes.newNote))
    .get(isLoggedIn, catchAsync(notes.allNote))

router.route('/:id')
    .get(isLoggedIn, catchAsync(notes.oneNote))    
    .put(isLoggedIn, validateNotes, catchAsync(notes.editnote))
    .delete(isLoggedIn, catchAsync(notes.deleteNote))

module.exports = router;