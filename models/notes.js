const mongoose = require('mongoose');
const { Schema } = mongoose;

const noteSchema  = new Schema({
    title : {
        type : String,
        required : true,
        trim : true,
        maxlength : 50
    },
    content : {
        type : String,
        required : false,
        minlength : 3
    },
    tags :[
        {
            type :String,
            required : true
        }
    ],
    user : {
        type : Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    isArchived: {
        type: Boolean,
        default: false,
    },
    isPinned: {
        type: Boolean,
        default: false,
    },
},
    { timestamps: true }    
);

module.exports = mongoose.model('Note', noteSchema);