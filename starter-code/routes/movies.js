const express = require('express');
const router = express.Router();

const Movie = require('../models/movie')
const Celebrity = require('../models/celebrity')


// READ
// GET /movies --> display the data from Mongo
router.get("/", (req,res,next) => {
    Movie.find().populate('cast').then(moviesFromMongo => {
        res.render("movies/index", { myMovies: moviesFromMongo})
    }).catch(error => {
        console.log("something went wrong with getting data from mongo =>", error)
    })
})

// READ
// GET /movies/show --> show the form to create new movies
router.get("/:id/show", (req, res, next) => {
    Movie.findById(req.params.id).populate("cast").then(movieFromMongo => {
        res.render("movies/show", movieFromMongo) // *** NO SLASH BEFORE MOVIES!!! ***
    })
})


// READ
// GET /movies/new --> show the form to create new movies
router.get("/new", (req, res, next) => {
    Celebrity.find().then(celebritiesFromMongo => {
        res.render("movies/new", { allCelebs: celebritiesFromMongo}) // *** NO SLASH BEFORE MOVIES!!! ***
    })
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

// DELETE
// /movies/delete
router.post("/:id/delete", (req, res, next) => {
    Movie.findByIdAndRemove(req.params.id).then(() => {
        console.log('which movie are we deleting ' + req.params.id)
        res.redirect('/movies')
    })
    .catch(err => {
        console.error('Error while DELETING movie', err)
        res.render('/movies')
    });
})

// UPDATE
// GET /movies/edit --> this shows edit form
router.get("/:id/edit", (req, res, next) => {
    console.log(`we are trying to go to edit page ` + req.params.id)
    Movie.findById(req.params.id).then((movie) => {
        Celebrity.find().then(celebritiesFromMongo => { // HERE WE COULD USE promiseAll(Promise1, Promise2)
            celebritiesFromMongo.forEach((a) => {
                if (movie.cast.includes(a._id)) {
                  a.selected = true
                }
              })
            res.render("movies/edit", { myMovie: movie, allCelebs: celebritiesFromMongo}) // *** NO SLASH BEFORE MOVIES!!! ***
        })
    })
    .catch(err => {
        console.error('Error while loading EDIT movie page', err)
        res.render('/movies')
    });
})

// UPDATE
// POST /movies/edit --> this takes data from edit form
router.post("/:id", (req,res,next) => {
    let { title, genre, plot, cast } = req.body
    Movie.findByIdAndUpdate(req.params.id, { title, genre, plot, cast }).then(() => {
        res.redirect("/movies");
    })
    .catch(err => {
        console.error('Error while submitting EDIT movie form', err)
        res.render('/movies')
    });
})

module.exports = router;