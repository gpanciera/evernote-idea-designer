require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const apiRouter = require('./routes/api');
// const session = require('express-session');
const PORT = 3000;

// api route handlers
app.use('/api', apiRouter);

/* In development mode, Express server doesn't need to serve these items because webpack will have compiled them into its' own memory */
if(process.env.NODE_ENV === 'production') {
  app.use('/build', express.static(path.join(__dirname, '../build')));

  app.get('/', (req, res, next) => {
      res.sendFile(path.join(__dirname, '../index.html'));
  }) 
}

// catch-all route handler for any requests to an unknown route
app.use((req, res) => res.sendStatus(404));

/* GLOBAL ERROR HANDLER */
app.use((err, req, res, next) => {
  const defaultErr = {
      log: `************** Error in server middleware: ${err.message} **************`,
      status: 400,
      message: { err: 'An unknown error occurred' },
  }
  const errorObj = Object.assign({}, defaultErr, err)
  console.log(errorObj.log);
  res.status(errorObj.status).json(errorObj.message);
})

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
}); 

// is this needed? 
module.exports = app;