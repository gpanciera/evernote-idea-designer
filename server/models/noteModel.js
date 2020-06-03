const mongoose = require('mongoose');
require('dotenv').config();

// const MONGO_URI = 'mongodb+srv://gpanciera:N64rpauDW6IO4j7N@cluster0-xesgv.mongodb.net/test?retryWrites=true&w=majority';
const MONGO_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0-xesgv.mongodb.net/test?retryWrites=true&w=majority`;

// TO RESEARCH FURTHER - best way to handle connection error. Postman currently spins if I submit wrong pw
mongoose.connect(MONGO_URI, {
    // options for the connect method to parse the URI
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // sets the name of the DB that our collections are part of
    dbName: 'evernoteDB'
  })
  .then( ( ) => console.log('Connected to Mongo DB.'))
  .catch( err => {
    console.log(`Server encountered error connecting to Mongo DB: ${err}`);
  });

const noteSchema = new mongoose.Schema({
  evernoteID: Number,
  summary: String,
  type: String,
  note: String,
  related: Array,
});

// creats a model for the 'note' collection that will be part of the export
// 1st arg is model name, 2nd arg schema to use, 3rd arg is optionally collection name, which will defaul to same as 1st arg, model name
const Note = mongoose.model('notes', noteSchema);

module.exports = Note;