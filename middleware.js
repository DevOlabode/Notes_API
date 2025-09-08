const {noteSchema} = require('./schema');
const ExpressError = require('./utils/expressError');

module.exports.validateNotes  = (req, res, next)=>{
    const { error } = noteSchema.validate(req.body);
    if(error){
        const message = error.details.map(el => el.message).join(',');
        throw new ExpressError(message, 400)
    }else{
        next();
    }
};

module.exports.isLoggedIn = function(req, res, next){
    if(!req.isAuthenticated()){
        return res.status(401).json({msg : 'You must be logged in!'});
    }
    next();
};
