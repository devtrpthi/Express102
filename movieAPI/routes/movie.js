var express = require('express');
var router = express.Router();

/* GET movie page. */
const movieDetails = require('../data/movieDetails')

router.get('/:movieId',(req,res,next) => {
  const movieId = req.params.movieId
  const results = movieDetails.find((movie) => {
    return movie.id == movieId
  })
  if(!results){
    res.json({
      msg: 'Not found'
    })
  }
  else {
    res.json({
      results
    })
  }
})


module.exports = router;
