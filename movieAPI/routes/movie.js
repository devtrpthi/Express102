var express = require('express');
var router = express.Router();

/* GET movie page. */
const movieDetails = require('../data/movieDetails')

router.param(('movieId'),(req,res,next) => {
  console.log('Wildcard movieid route triggered')
  next()
})

router.get('/top_movierated', (req,res,next) => {
  let page = req.body.page
  if(!page){page=1}
  const results = movieDetails.sort((a,b) => {
    return b.vote_average - a.vote_average
  })
  const indexToStart = (page - 1)*20
  res.json(results.slice(indexToStart,indexToStart  +20))
})

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

router.post('/:movieId/rating', (req,res,next) => {
  const movieIt = req.params.movieId
  const userRating = req.body.value
  if((userRating < .5 || userRating > 10)) {
    res.json({
      msg: 'Rating barrier not followed'
    })} else {
    res.json({
        msg: 'Rating accepted',
        status_code: 200
      })
  }
})

router.delete('/:movieId/rating',requireJSON,(req,res,next) => {
  res.json({
    msg: 'Rating delted'
  })
})


module.exports = router;
