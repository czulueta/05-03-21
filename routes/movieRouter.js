const express = require("express")
const movieRouter = express.Router()
const Movie = require("../models/movie.js")

movieRouter.get("/", (req, res, next) => {
    Movie.find((err, movies) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(movies)
    })
})
movieRouter.post("/", (req, res, next) => {
    const newMovie = new Movie(req.body)
    newMovie.save((err, savedMovie) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(201).send(savedMovie)
    })
})
movieRouter.delete("/:movieId", (req, res, next) => {
    Movie.findOneAndDelete({ _id: req.params.movieId }, (err, deletedMovie) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(`successfully deleted ${deletedMovie.title}`)
    })
})
movieRouter.put("/:movieId", (req, res, next) => {
    Movie.findOneAndUpdate(
        { _id: req.params.movieId }, 
        req.body, 
        {new: true}, 
        (err, updatedMovie) => {
            if(err){
                res.status(500)
                return next(err)
            }
        return res.status(201).send(updatedMovie)
    })
})

module.exports = movieRouter