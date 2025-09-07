
const express  = require('express');
const router = express.Router();

const Note = require('../models/notes');

const ExpressError  = require('../utils/expressError');
const catchAsync  = require('../utils/catchAsync');

const { isLoggedIn } = require('../middleware')

router.post('/', catchAsync(async (req, res)=>{
    const note = new Note({
        ...req.body,
        user : req.user._id
    });
    await note.save();
    res.status(201).json({msg : 'Note Created successfully', note})
}));

router.get("/", isLoggedIn, catchAsync(async (req, res) => {
    const searchTerm = req.query.q || ""; 
    const tag = req.query.tag; 
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page -1) * limit

    const query = {
      user: req.user._id,
      title: { $regex: searchTerm, $options: "i" }, // case-insensitive search
    };

    if (tag) {
      query.tags = tag;
    };

    const total = await Note.countDocuments(query);

    const notes = await Note.find(query)
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

    if (notes.length === 0) {
      return res.status(404).json({ error: "No notes found" });
    }

    res.status(200).json({
      success: true,
      count: notes.length,
      page,
      totalPages : Math.ceil(total / limit),
      toatlNotes : total,
      data: notes,
    });
  })
);


router.get('/:id', isLoggedIn, catchAsync(async(req, res)=>{
    const note  = await Note.findById({_id : req.params.id, user : req.user._id});
    if(!note){
        return res.status(404).json({error : 'Note Not Found'})
    }
    res.json(note);
}));

router.put('/:id', isLoggedIn, catchAsync(async(req, res)=>{
    const note = await Note.findByIdAndUpdate({
        _id : req.params.id,
        user : req.user._id,
    },
    req.body,
    {
        new : true,
        runValidators : true
    }
);
    if(!note){
        return res.status(404).json({error : 'Note Not Found'})
    }
    res.status(200).json({msg : 'Edited Changes Was Saved', note})
}));

router.delete('/:id', isLoggedIn, catchAsync(async(req, res)=>{
    const note = await Note.findByIdAndDelete({_id : req.params.id, user : req.user._id});
    if(!note) return res.status(404).json({error : 'Note Not Found'})
    res.status(200).json({msg : `${note.title} deleted successfully`})    
}))

module.exports = router;