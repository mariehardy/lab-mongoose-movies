const mongoose = require('mongoose');
const Celebrity = require('../models/celebrity');
const Movie = require('../models/movie');

mongoose
  .connect('mongodb://localhost/starter-code', {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const celebritiesSeed = [
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


const moviesSeed = [
  {title: "The Conversation",
  genre: "Action",
  plot: "Some guys around a bar.",
  cast: "5e91da8a6da6f80e33f48d08"
  }
];

Celebrity.insertMany(celebritiesSeed).then(() => { 
  Movie.insertMany(moviesSeed).then(() => {
    mongoose.connection.close();
  })
});

// Movie.insertMany(moviesSeed, function(error, docs){
//   console.log(docs);
//   console.log(error);
//   mongoose.connection.close();
// });

console.log(mongoose);