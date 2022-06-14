const express = require('express');
const { User, Recipe } = require('../db/associations');
const basicAuth = require('express-basic-auth');
const dbAuthorizer = require ('../routes/auth')
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('db/db.sqlite');

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

const findAllFavorites = (req, res, next)=> {
    const userId = req.query.userId;
    const query = `SELECT * FROM Favorites WHERE userId=(?);`
    
    db.all(query, [userId], (error, rows) => {
        if (error) next(error)
        req.data = rows;
        next()
    })
}

const addFavorites = (req, res, next) => {
    const userId = req.query.userId;
    const recipeId = req.query.recipeId;
    const createdAt = (new Date()).toISOString();
    const query = `INSERT INTO Favorites (createdAt, updatedAt, userId, RecipeId) VALUES (?,?,?,?);`
    
    db.run(query, [createdAt, createdAt, userId, recipeId], (error) => {
        if (error) next(error)
        next()
    })
}

const deleteFavoriteById = (req, res, next) => {
    const userId = req.query.userId;
    const recipeId = req.query.recipeId;
    const query = 'DELETE FROM Favorites WHERE userId=(?) AND RecipeId=(?)'

    db.run(query,[userId, recipeId], (error) => {
        if (error) next(error)
        next()
    })
}

// Route - /favorites

const router = express.Router();

// router.use(basicAuth({
//     authorizer : dbAuthorizer,
//     authorizeAsync: true,
//     challenge: true,
//     unauthorizedResponse : () => "You do not have access to this content. Please log in"
// }))

router.get('/', findAllFavorites, sendResponse)
router.post('/', addFavorites, sendResponse)
router.delete('/', deleteFavoriteById, sendResponse)
router.use(handleError)

module.exports = router