const mongoose = require('mongoose');
const Celebrity = require('../models/celebrity');

mongoose
  .connect('mongodb://localhost/starter-code', {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const seed = [
    {name: "Will Smith",
     occupation: "Actor",
     catchPhrase: "Being realistic is the most common path to mediocrity."
    },
    {name: "Tom Cruise",
     occupation: "Actor",
     catchPhrase: "No dream is ever just a dream."
    },
    {name: "Al Pacino",
     occupation: "Actor",
     catchPhrase: "I always tell the truth, even when I lie."
    }
];

Celebrity.insertMany(seed, function(error, docs){
    console.log(docs);
    console.log(error);
    mongoose.connection.close();
});

console.log(mongoose);