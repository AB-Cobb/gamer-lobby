const express = require('express');
const app = express();
const playerRoute = express.Router();

let Player = require('../models/Player')

//Add
playerRoute.route('/add-player').post((req,res,next) =>{
    Player.create(req.body, (error, data) =>{
        if (error) {
            console.log(error);
            return next(error);
        } else {
            res.json(data)
        }
    })
})

//Get
playerRoute.route('/get-player/:id').get((req, res) => {
    Player.findById(req.params.id, (error, data) =>{
        if (error) {
            console.log(error);
            return next(error);
        } else {
            res.json(data);
        } 
    })
})

//List
playerRoute.route('/get-all-players').get((req, res) => {
    Player.find((error, data) => {
        if (error) {
            console.log(error);
            return next(error);
        } else {
            res.json(data);
        }
    })
})

//Update
playerRoute.route('/update-player/:id').put((req, res, next) =>{
    Player.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            console.log(error);
            return next(error);
        } else {
            res.json(data)
            console.log('updated player')
        }
    })
})

//Delete
playerRoute.route('/delete-player/:id').delete((req, res, next) => {
    Player.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
})

module.exports = playerRoute;