const express = require('express');
const router = express.Router();

// Movie Model
const Movie = require('../../models/Movie');

// @route GET api/movies
// @desc Get All Movies
// @access Public
router.get('/', (req, res) => {
    Movie.find().then(movies => res.json(movies));
});

// @route POST api/movies
// @desc Add A Movie
// @access Public
router.post('/', (req, res) => {
    const newMovie = new Movie({
        imdbID: req.body.imdbID,
        Title: req.body.Title,
        Poster: req.body.Poster,
        Year: req.body.Year
    });

    newMovie.save().then(movie => res.json(movie));
});

// @route DELETE /api/movies/:id
// @desc Delete A Movie
// @access Public
router.delete('/:id', (req, res) => {
    Movie.findById(req.params.id)
        .then(movie => movie.remove().then(() => res.json({ success: true })))
        .catch(error => res.status(404).json({ success: false, message: "Movie not found" }));
});

module.exports = router;
