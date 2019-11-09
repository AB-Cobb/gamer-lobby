const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Game = new Schema({
    game_title: {
        type: String
    },
    game_platform: { 
        type: String
    },
    game_genre :{
        type: String
    },
    game_rating: {
        type: Number
    },
    game_publisher: {
        type: String
    },
    game_release: {
        type: Number
    },
    game_status: {
        type: String
    }
})

module.exports = mongoose.model('Game', Game)