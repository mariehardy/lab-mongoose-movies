const express = require('express');
const router = express.Router();

const Celebrity = require('../models/celebrity')


// READ
// GET /celebrities --> display the data from Mongo
router.get("/",(req,res,next)=>{
    Celebrity.find().then(dataFromMongo=>{
        res.render("celebrities/index",{ myCelebrities: dataFromMongo})
    }).catch(error=>{
        console.log("something went wrong with getting data from mongo =>", error)
    })
})

// READ
// GET /celebrities/new --> this shows the form
router.get('/new', (req, res, next) => {
    res.render('celebrities/new')
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
        res.redirect('/celebrities')
      })

    .catch(err => {
        console.error('Error connecting to mongo', err)
        res.render('/new')
    });
})

// READ
// GET /celebrities/show  --> takes us to the details page of a specific celebrity

router.get('/:id', (req, res, next) => {
    Celebrity.findById(req.params.id).then(celebFromMongo => {
        res.render('celebrities/show', celebFromMongo)
    })
    .catch(error=>{
        console.log("something went wrong with get celeb id from mongo =>", error)
    })
})

// DELETE
// POST /celebrities/:id/delete --> deletes the identified celebrity from db
router.post('/:id/delete', (req, res, next) => {
    console.log(`DELETED ITEM'S req.params.id: ` + req.params.id)
    Celebrity.findByIdAndRemove(req.params.id).then(() => {
        res.redirect('/celebrities')
    })
    .catch(err => {
        console.log('Error while DELETING celebrity', err)
        res.render('celebrities/index')
    })
})

// UPDATE
// GET /celebrities/:identifier/edit --> show edit celebrity form
router.get('/:identifier/edit', (req, res, next) => {
    console.log('Should show Edit page')
    Celebrity.findById(req.params.identifier).then((celeb) => {
        console.log('celeb details from Mongo' + celeb)
        res.render('celebrities/edit', celeb)
    })
    .catch(err => {
        console.log('Error while getting data from EDIT celebrity form', err)
        res.render('celebrities/index')
    })
})

//UPDATE
//POST
router.post('/:identifier', (req, res, next) => {
    let { name, occupation, catchPhrase} = req.body
    Celebrity.findByIdAndUpdate(req.params.identifier, { name, occupation, catchPhrase}).then(() => {
//  Celebrity.findByIdAndUpdate(req.params.identifier, { name: req.body.name, occupation: req.body.occupation, catchPhrase: req.body.catchPhrase }).then(() => {
        res.redirect('/celebrities')
    })
    .catch(err => {
        console.log('Error while EDITING celebrity', err)
        res.render('celebrities/index')
    })
})

module.exports = router;
