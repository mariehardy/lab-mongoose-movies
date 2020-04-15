const express = require('express');
const router = express.Router();

const Movie = require('../models/movie')

// READ
// GET /movies --> display the data from Mongo
router.get("/", (req,res,next) => {
    // console.log("i am in movies route")

    Movie.find().then(dataFromMongo => {
        console.log("data from mongo ==> ", dataFromMongo)
        res.render("movies/index", { myMovies: dataFromMongo})
    }).catch(error => {
        console.log("something went wrong with getting data from mongo =>", error)
    })
})

// READ
// GET /movies/new --> show the form to create new movies
router.get("/new", (req, res, next) => {
    res.render("movies/new") // *** NO SLASH BEFORE MOVIES!!! ***
})

// POST
// /movies/create --> this takes the data and stores into db
router.post("/create", (req, res, next) => {
    console.log("req.body : ", req.body)

    // let { title, genre, plot, cast } = req.body

    let movie = new Movie({
        title: req.body.title, 
        genre: req.body.genre,
        plot: req.body.plot, 
        cast: req.body.cast
    })

    movie.save().then(() => {
        console.log('after new movie is saved')
        res.redirect('/movies')
      })

    .catch(err => {
        console.error('Error connecting to mongo when creating new movie', err)
        res.render('/new')
    });

})


module.exports = router;