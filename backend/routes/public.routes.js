const express = require('express');
const app = express();
const playerRoute = express.Router();

let Player = require('../models/Player')

//Join game
playerRoute.route('/join_game/:id').put((req, res, next) =>{
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