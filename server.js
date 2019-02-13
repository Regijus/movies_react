const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const movies = require('./routes/api/movies');

const app = express();

// Bodyparser Middleware
app.use(bodyParser.json());

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log('MongoDB Connected Successfully'))
    .catch(err => console.log(err));

// Use Routes
app.use('/api/movies', movies);

// Port Config
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
