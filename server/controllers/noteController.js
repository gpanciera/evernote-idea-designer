var Evernote = require('evernote');
var convert = require('xml-js');

const Note = require('../models/noteModel.js');

const noteController = {}

noteController.getNotes = (req, res, next) => {
  Note.find({}).exec()
  .then(notes => {
    res.locals.notes = notes;
    console.log("************** res.locals.notes **************", res.locals.notes);
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




// noteController.getNotes = (req, res, next) => {

//   // console.log("in get notes")
//   // console.log("noteController.getNotes -> process.env.EN_DEV_TOKEN", process.env.EN_DEV_TOKEN)
//   const client = new Evernote.Client({ 
//       token: process.env.EN_DEV_TOKEN, sandbox: true, china: false 
//   });
  
//   // Set up the NoteStore client 
//   const noteStore = client.getNoteStore();
 
//   // words: "",
//   // Make API calls 
//   let filter = new Evernote.NoteStore.NoteFilter({
//     notebookGuid: "f468f23d-8214-4475-8d05-4491bdaa3f07",
//     ascending: false,
//   });

//   let spec = new Evernote.NoteStore.NotesMetadataResultSpec({
//     includeTitle: true,
//     includeContentLength: true,
//     includeCreated: true,
//     includeUpdated: true,
//     includeDeleted: true,
//     includeUpdateSequenceNum: true,
//     includeNotebookGuid: true,
//     includeTagGuids: true,
//     includeAttributes: true,
//     includeLargestResourceMime: true,
//     includeLargestResourceSize: true,
//   });
  
//   let noteToSend = {
//     evernoteID: 0,
//     summary: '',
//     type: 'journal',
//     note: '',
//     related: [],
//   }

//   completeNotesList = [];

//   noteStore.findNotesMetadata(filter, 0, 500, spec)
//     .then( data => {
//       let promArr = data.notes.map( note => {
//         return (noteStore.getNoteContent(note.guid)
//           .then( rawNoteXMLContent => {
//             jsObjNote = convert.xml2js(rawNoteXMLContent, {compact: true});
//             console.log("noteController.getNotes -> jsObjNote", jsObjNote);
//             return Object.assign({}, noteToSend, { evernoteID: note.guid, note: jsObjNote['en-note'].div});
//           })
//           .catch(err => console.log("ERROR GETTING NOTE CONTENT FROM EVERNOTE"))
//         )
//       })
//       Promise.all(promArr)
//         .then( data => {
//           console.log("****** completeNotesList AFTER LOOP ******", data);
//           res.locals.notes = data;
//           return next();
//         })
//         .catch((err, req, res, next) => {
//           return next(err)
//         })  
//     })
//     .catch(err => console.log("ERROR COLLECTING NOTES FROM EVERNOTE"))
// }


// noteStore.listNotebooks()
// .then( notebooks => {
//   for (let i in notebooks) {
//     console.log("Notebook: " + notebooks[i].name);
//   }
//   console.log("notebooks[1]: ", notebooks[1]);

//   res.locals.notes = notebooks[0].name;
//   return next();
// })
// .catch((err, req, res, next) => {
//   return next({
//     log: `Error in noteController.getNotes : ${err}`, 
//     message: {err: 'Error getting notes from database'},
//   })
// })  


/*

*/



// let allPromises = data.notes.map( note => {
//   // console.log("noteController.getNotes -> note", note)
//   // console.log("noteController.getNotes -> note.guid", note.guid)
//   return new Promise( (resolve, reject) => {
//     noteStore.getNoteContent(note.guid)

//     if (err) return reject({ type: 'dbCreate', err });
//     console.log(`Created article in db`);
//     return resolve(result);


//     ( noteContent => {
//       console.log("noteController.getNotes -> noteContent", noteContent);
//       let noteToSend = {
//         evernoteID: note.guid,
//         summary: '',
//         type: 'journal',
//         note: noteContent,
//         related: [],
//       }
//       return noteToSend;
//     })
//     .catch(err => console.log("ERROR GETTING NOTE CONTENT FROM EVERNOTE"))
//   }
// })
// Promise.all(allPromises).then( data => {
//     console.log("****** completeNotesList AFTER LOOP ******", data);
//     res.locals.notes = data;
//     return next();
// }
// )

// noteController.getNotes -> jsObjNote {
//   _declaration: { _attributes: { version: '1.0', encoding: 'UTF-8' } },
//   _doctype: 'en-note SYSTEM "http://xml.evernote.com/pub/enml2.dtd"',
//   'en-note': { div: { _text: 'Oh yeah dog ' } }
// }
