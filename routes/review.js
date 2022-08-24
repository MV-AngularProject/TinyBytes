const express = require('express');
const { Review, Recipe } = require('../db/associations');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('db/db.sqlite');
const router = express.Router();

// Middleware

const sendResponse = (req, res) => {
    const status = 200
    const response = {
        message: `Success`,
        status, 
    }

    if (req.data) {
        response.data = req.data 
    }

    res
    .status(status)
    .json(response)
}

const handleError = (error, req, res, next) => {
    console.error(error)
    const status = 500
    const response = {
        message: 'Oops, something went wrong',
        error,
        status
    }

    res
    .status(status)
    .json(response)
}

const findAllReviews = async (req, res, next)=> {
    const recipeId = req.params.recipeId;
    const query = `SELECT Reviews.userName, Reviews.review
                    FROM RecipeReview
                    JOIN Reviews on Reviews.id = RecipeReview.ReviewId
                    WHERE recipeId=(?);`
    
    db.all(query, [recipeId], (error, rows) => {
        if (error) next(error)
        req.data = rows;
        next()
    })
}
  
router.get('/:recipeId/reviews', findAllReviews, sendResponse)

module.exports = router