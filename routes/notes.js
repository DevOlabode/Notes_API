
const express  = require('express');
const router = express.Router();

const Note = require('../models/notes');

const ExpressError  = require('../utils/expressError');
const catchAsync  = require('../utils/catchAsync');

const notes = require('../controllers/notes')

const { isLoggedIn, validateNotes } = require('../middleware')

router.post('/', validateNotes, catchAsync(notes.newNote));

router.get("/", isLoggedIn, catchAsync(notes.allNote));


router.get('/:id', isLoggedIn, catchAsync(notes.oneNote));

router.put('/:id', isLoggedIn, validateNotes, catchAsync(notes.editnote));

router.delete('/:id', isLoggedIn, catchAsync(notes.deleteNote))

module.exports = router;