const Note = require('../models/noteModel.js');

const noteController = {}

noteController.getNotes = (req, res, next) => {
  Note.find({}).exec()
  .then(notes => {
    res.locals.notes = notes;
    // console.log("************** res.locals.notes **************", res.locals.notes);
    return next();
  })
  .catch((err, req, res, next) => {
    return next({
      log: `Error in noteController.getNotes : ${err}`, 
      message: {err: 'Error getting notes from database'},
    })
  })
}

module.exports = noteController;