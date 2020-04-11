const express = require('express');
const router = express.Router();

const Celebrity = require('../models/celebrity')


// READ
// GET /celebrities --> display the data from Mongo
router.get("/",(req,res,next)=>{
    // console.log("i am in celebrities route")

    Celebrity.find().then(dataFromMongo=>{
        // console.log("data from mongo ==> ",dataFromMongo)
        res.render("celebrities/index",{ myCelebrities: dataFromMongo})
    }).catch(error=>{
        console.log("something went wrong with getting data from mongo =>", error)
    })
})

// READ
// GET /celebrities/new --> this shows the form

router.get('/new', (req, res, next) => {
    console.log('i am in celeb NEW route')
    res.render('celebrities/new-celebrity')
});

// CREATE
// POST /celebrities/create --> this takes the data and stores into db
router.post('/create', (req, res, next) => {

        console.log("req.body : ", req.body)

    // let { name, occupation, catchPhrase } = req.body


    let celebrity = new Celebrity({
        name: req.body.name,
        occupation: req.body.occupation,
        catchPhrase: req.body.catchPhrase
    })

    celebrity.save().then(() => {
        console.log('after new celebrity is saved')
        res.redirect('/celebrities')
      })

    .catch(err => {
        console.error('Error connecting to mongo', err)
        res.render('/new')
    });

})

module.exports = router;
