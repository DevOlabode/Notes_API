
const express  = require('express');
const router = express.Router();

const catchAsync  = require('../utils/catchAsync');

const notes = require('../controllers/notes')

const { isLoggedIn, validateNotes } = require('../middleware');

router.route('/')
    .get(isLoggedIn, catchAsync(notes.allNote))
    .post(validateNotes, catchAsync(notes.newNote))

router.route('/:id')
    .get(isLoggedIn, catchAsync(notes.oneNote))    
    .put(isLoggedIn, validateNotes, catchAsync(notes.editnote))
    .delete(isLoggedIn, catchAsync(notes.deleteNote))

module.exports = router;