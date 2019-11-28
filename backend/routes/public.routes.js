const express = require('express');
const app = express();
const publicRoute = express.Router();

let Player = require('../models/Player')
let Game = require('../models/Game')

//Join game
publicRoute.route('/join_game/:id').put((req, res, next) =>{
    Player.findByIdAndUpdate(req.params.id, {
        $set: {'player_status' : 'Unavailible'}
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
//exit game
publicRoute.route('/exit_game/:id').put((req, res, next) =>{
    Player.findByIdAndUpdate(req.params.id, {
        $set: {'player_status' : 'Availible'}
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


//get player
publicRoute.route('/get-player/:id').get((req, res) => {
    Player.findById(req.params.id, (error, data) =>{
        if (error) {
            console.log(error);
            return next(error);
        } else {
            res.json(data);
        } 
    })
})


//list players
publicRoute.route('/get-all-players').get((req, res) => {
    Player.find((error, data) => {
        if (error) {
            console.log(error);
            return next(error);
        } else {
            res.json(data);
        }
    })
})
//list games
publicRoute.route('/get-all-games').get((req, res) => {
    Game.find((error, data) => {
        if (error) {
            console.log(error);
            return next(error);
        } else {
            res.json(data);
        }
    })
})
module.exports = publicRoute;