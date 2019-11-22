const express = require('express');
const app = express();
const publicRoute = express.Router();

let Player = require('../models/Player')

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
module.exports = publicRoute;