const express = require('express')
const path = require('path')
const cors = require('cors')
const volleyball = require('volleyball')
const app = express()

// static middleware
app.use(express.static(path.join(__dirname, '..','public')))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(cors())
app.use(volleyball)

//this is where some things should go

app.use('/api', require('./api'))


// routes that need the html. If none of these routes, then give a 404 page.
// This is a workaround for the express and react interactions
app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.get('/campuses/:id', (req, res, next) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});


app.get('/campuses', (req, res, next) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.get('/students/:id', (req, res, next) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.get('/students', (req, res, next) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

// Error middleware

app.use((req, res, next) => {
    const error = Error('page not found');
    error.status = 404;
    next(error);
});
  
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).send(err.message || 'Internal server error.');
});
  
module.exports = app;

